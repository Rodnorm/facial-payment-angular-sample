import { Injectable, ElementRef } from '@angular/core';

import * as faceApi from 'face-api.js';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor() {}

  public smileFaceCounter: number = 0;
  public angryFaceCounter: number = 0;
  public sadFaceCounter: number = 0;

  getSadFaceCounter() {
    return this.sadFaceCounter;
  }

  setSadFaceCounter(newValue: number) {
    this.sadFaceCounter = newValue;
  }

  getAngryFaceCounter() {
    return this.angryFaceCounter;
  }

  setAngryFaceCounter(newValue: number) {
    this.angryFaceCounter = newValue;
  }

  getSmileFaceCounter() {
    return this.smileFaceCounter;
  }

  setSmileFaceCounter(newValue: number) {
    this.smileFaceCounter = newValue;
  }

  loadModels() {
    const MODEL_URL =
      'https://cors-anywhere.herokuapp.com/raw.githack.com/justadudewhohacks/face-api.js/master/weights';
    return Promise.all([
      faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
  }

  createDetection = (video: ElementRef, container: ElementRef) => {
    const canvas = faceApi.createCanvasFromMedia(
      video.nativeElement as HTMLVideoElement
    );
    canvas.className = 'canvas';
    canvas.style.position = 'absolute';
    const context = canvas.getContext('2d');
    context && context.translate(canvas.width / 2, canvas.height / 2);
    context && context.scale(-1, 1);
    (container.nativeElement as HTMLDivElement).prepend(canvas);

    const displaySize = {
      width: (video.nativeElement as HTMLVideoElement).videoWidth,
      height: (video.nativeElement as HTMLVideoElement).videoHeight,
    };
    faceApi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceApi
        .detectAllFaces(
          video.nativeElement as HTMLVideoElement,
          new faceApi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceApi.resizeResults(detections, displaySize);
      context && context.clearRect(0, 0, canvas.width, canvas.height);
      faceApi.draw.drawDetections(canvas, resizedDetections);
      faceApi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceApi.draw.drawFaceExpressions(canvas, resizedDetections);

      if (
        detections[0] &&
        detections[0].expressions != undefined &&
        detections.length > -1 &&
        detections[0].hasOwnProperty('expressions')
      ) {
        const expressions = detections[0].expressions;
        if (expressions.happy > 0.99) {
          this.setSmileFaceCounter(this.getSmileFaceCounter() + 1);
        } else if (expressions.angry > 0.99) {
          this.setAngryFaceCounter(this.getAngryFaceCounter() + 1);
        } else if (expressions.sad > 0.99) {
          this.setSadFaceCounter(this.getSadFaceCounter() + 1);
        }
      }
    }, 100);
  };
}
