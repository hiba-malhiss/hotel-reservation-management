import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hrm-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss']
})
export class SpinnerOverlayComponent implements OnInit {
  @Input()
  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
