import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor() {}
  public smileCounter: number = 0;
  getSmileCounter() {
    return this.smileCounter;
  }
  setSmileCounte(newValue: number) {
    this.smileCounter = newValue;
  }
}
