import { Component, OnInit, ViewChild } from '@angular/core';
import { Room } from "../../components/room-card/room.modal";
import { RoomsService } from "../../services/rooms.service";
import { BehaviorSubject } from "rxjs";
import { Paginator } from "primeng/paginator";

@Component({
  selector: 'app-rooms-view',
  templateUrl: './rooms-view.component.html',
  styleUrls: ['./rooms-view.component.scss']
})
export class RoomsViewComponent implements OnInit {
  rowsPerPage = 10;
  totalRooms = 0;
  currentPage = 1;
  rooms: Room[] = [];
  isLoadingRooms = false;
  filters = new BehaviorSubject({});

  @ViewChild(Paginator)
  paginator?: Paginator;

  constructor(private roomsService: RoomsService) {
  }

  ngOnInit(): void {
    this.filters.subscribe(() => {
      if (this.paginator) {
        // reset pagination on filter change reseting the pagination will trigger fetch
        this.paginator.changePage(0);
      } else {
        this.fetchRooms();
      }
    })
  }

  fetchRooms() {
    this.isLoadingRooms = true;
    this.roomsService.getHotelRooms(this.currentPage, this.rowsPerPage, this.filters.value).then((data) => {
      this.rooms = data.rooms;
      this.totalRooms = data.totalRecords;
      this.isLoadingRooms = false;
    }).catch(() => {
      this.isLoadingRooms = false;
      //todo toast message
    })
  }

  onPaginationChange(event: any) {
    this.currentPage = event.page + 1;
    this.fetchRooms();
  }
}
