import { Component, OnInit } from '@angular/core';
import { Room } from "../../components/room-card/room.modal";
import { RoomsService } from "../../services/rooms.service";

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

  constructor(private roomsService: RoomsService) {
  }

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms() {
    this.isLoadingRooms = true;
    this.roomsService.getHotelRooms(this.currentPage, this.rowsPerPage).then((data) => {
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
