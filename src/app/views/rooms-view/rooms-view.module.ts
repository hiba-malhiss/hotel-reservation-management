import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsViewComponent } from './rooms-view.component';
import { RoomCardModule } from '../../components/room-card/room-card.module';
import { FlexboxModule } from '../../../ui-kit/components/flexbox/src/flexbox.module';
import { PaginatorModule } from 'primeng/paginator';
import { RoomFiltersSidebarModule } from './room-filters-sidebar/room-filters-sidebar.module';
import { SpinnerOverlayModule } from '../../../ui-kit/components/spinner-overlay/src/spinner-overlay.module';

@NgModule({
  declarations: [RoomsViewComponent],
  imports: [
    CommonModule,
    RoomCardModule,
    FlexboxModule,
    PaginatorModule,
    RoomFiltersSidebarModule,
    SpinnerOverlayModule
  ],
  exports: [RoomsViewComponent]
})
export class RoomsViewModule {}
