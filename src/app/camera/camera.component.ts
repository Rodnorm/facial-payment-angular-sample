import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { CameraService } from './camera.component.service';
// import { CameraService } from './camera.component.service';
import { CameraService } from '../services/camera/camera.service'

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  constructor(private cameraService: CameraService) {}
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('videoContainer') videoContainer: ElementRef;

  private videoObject: {
    stream: NavigatorUserMediaSuccessCallback;
    error: NavigatorUserMediaErrorCallback;
  } = {
    stream: (stream: MediaStream) =>
      (this.videoElement.nativeElement.srcObject = stream),
    error: () => console.log('erro'),
  };

  getVideo = (): void => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        (navigator as any).webkitGetUserMedia ||
        (navigator as any).mozGetUserMedia ||
        (navigator as any).msGetUserMedia ||
        (navigator as any).oGetUserMedia;

      navigator.getUserMedia(
        { video: true },
        this.videoObject.stream,
        this.videoObject.error
      );
    } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true });
    }
    this.cameraService.loadModels()
    .then((result: any) => {
      setTimeout(
        () => this.cameraService.createDetection(this.videoElement, this.videoContainer),
        2000
      );
    });
  };

  ngOnInit(): void {
    this.getVideo();
  }
}
