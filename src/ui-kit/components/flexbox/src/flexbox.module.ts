import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexboxComponent } from './flexbox.component';

@NgModule({
  declarations: [FlexboxComponent],
  exports: [FlexboxComponent],
  imports: [CommonModule]
})
export class FlexboxModule {}
