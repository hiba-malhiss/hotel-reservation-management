import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  FlexboxAlign,
  FlexboxDirection,
  FlexboxJustify,
  FlexboxSpacing
} from "./flexbox.constants";

@Component({
  selector: 'hrm-flexbox',
  styleUrls: ['./flexbox.component.scss'],
  templateUrl: './flexbox.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FlexboxComponent implements OnChanges, OnInit {
  @Input()
  public align: FlexboxAlign = 'normal';

  @Input()
  public direction: FlexboxDirection = 'horizontal';

  @Input()
  public justify: FlexboxJustify = 'start';

  @Input()
  public spacing: FlexboxSpacing = 'none';

  @Input()
  public height?: string;

  @Input()
  public minHeight?: string;

  @Input()
  public fullHeight = false;

  @Input()
  public equalHeight = false;

  @Input()
  public wrap = false;

  public ngClass: any;

  public ngOnChanges(): void {
    this.update();
  }

  public ngOnInit(): void {
    this.update();
  }

  protected update() {
    this.ngClass = {
      Flexbox: true,
      [`Flexbox--${this.align}Align`]: true,
      [`Flexbox--${this.direction}Direction`]: true,
      [`Flexbox--${this.justify}Justify`]: true,
      [`Flexbox--${this.spacing}Spacing`]: true,
      'Flexbox--fullHeight': this.equalHeight || this.fullHeight,
      'Flexbox--wrap': this.wrap
    };
  }
}
