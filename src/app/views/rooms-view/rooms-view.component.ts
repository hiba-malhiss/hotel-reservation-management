import { Component, OnInit, ViewChild } from '@angular/core';
import { Room } from '../../components/room-card/room.modal';
import { RoomsService } from '../../services/room/rooms.service';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { SubscriptionManagerComponent } from '../../components/subscription-manager/subscription-manager.component';

@Component({
  selector: 'app-rooms-view',
  templateUrl: './rooms-view.component.html',
  styleUrls: ['./rooms-view.component.scss']
})
export class RoomsViewComponent
  extends SubscriptionManagerComponent
  implements OnInit
{
  rowsPerPage = 10;
  totalRooms = 0;
  currentPage = 1;
  rooms: Room[] = [];
  isLoadingRooms = false;
  filters$ = new BehaviorSubject({});
  firstPageChange: boolean = true;

  @ViewChild(Paginator)
  paginator?: Paginator;

  constructor(private roomsService: RoomsService) {
    super();
  }

  ngOnInit(): void {
    this.filters$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.paginator) {
        // reset pagination on filter change
        this.paginator.changePage(0);
      } else {
        this.fetchRooms();
      }
    });
  }

  fetchRooms() {
    this.isLoadingRooms = true;
    this.roomsService
      .getHotelRooms(this.currentPage, this.rowsPerPage, this.filters$.value)
      .then(data => {
        this.rooms = data.rooms;
        this.totalRooms = data.totalRecords;
        this.isLoadingRooms = false;
      })
      .catch(() => {
        this.isLoadingRooms = false;
        //todo toast message
      });
  }

  onPaginationChange(event: any) {
    // skip first data fetch, to prevent double fetching
    if (this.firstPageChange) {
      this.firstPageChange = false;
    } else {
      this.currentPage = event.page + 1;
      this.fetchRooms();
    }
  }
}
