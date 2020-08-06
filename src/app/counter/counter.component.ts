import { Component, OnInit, Input } from '@angular/core';
import { CameraService } from '../services/camera/camera.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
  constructor(private cameraService: CameraService) {}
  @Input() smileFaceCounter: number = 0;
  @Input() sadFaceCounter: number = 0;
  @Input() angryFaceCounter: number = 0;
  public shouldDisableButton: boolean = false;

  ngOnInit(): void {
    this.checkButton();
  }
  public resetCounter() {
    this.cameraService.resetItems();
  }
  public checkButton() {
    debugger;

    this.shouldDisableButton =
      (this.smileFaceCounter ||
        this.sadFaceCounter ||
        this.angryFaceCounter) === 0;
  }
}
