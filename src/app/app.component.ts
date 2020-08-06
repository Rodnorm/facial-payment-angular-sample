import { Component } from '@angular/core';
import { CameraService } from './services/camera/camera.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export    class AppComponent {
  constructor(public cameraService: CameraService) {}
  title = 'facial-payment-angular-sample';
  public breakpoint: number;
  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  onResize(event: any){
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }
}
