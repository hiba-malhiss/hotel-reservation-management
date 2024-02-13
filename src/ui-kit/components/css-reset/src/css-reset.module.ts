import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CssResetComponent } from './css-reset.component';

@NgModule({
  declarations: [CssResetComponent],
  exports: [CssResetComponent],
  imports: [CommonModule]
})
export class CssResetModule {}
