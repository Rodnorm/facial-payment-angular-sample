import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/Button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CameraComponent } from './camera/camera.component';
import { CounterComponent } from './counter/counter.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [AppComponent, CameraComponent, CounterComponent],
  imports: [
    BrowserModule,
    MatProgressBarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
