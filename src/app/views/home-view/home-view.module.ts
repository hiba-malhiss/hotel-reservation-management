import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [HomeViewComponent],
  imports: [CommonModule, CardModule]
})
export class HomeViewModule {}
