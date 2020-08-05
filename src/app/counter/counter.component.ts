import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  constructor() { }
  @Input() smileFaceCounter: number = 0;
  @Input() sadFaceCounter: number = 0;
  @Input() angryFaceCounter: number = 0;
  ngOnInit(): void {
  }

}
