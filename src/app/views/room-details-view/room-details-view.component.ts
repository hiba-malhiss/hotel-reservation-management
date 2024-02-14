import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RoomsService } from "../../services/rooms.service";
import { Room } from "../../components/room-card/room.modal";
import { switchMap } from "rxjs";
import { AmenitiesIconMapper } from "../../modals/roomsData.modal";
import { ReserveManagementService } from "../../services/reserve-management.service";

@Component({
  selector: 'app-room-details-view',
  templateUrl: './room-details-view.component.html',
  styleUrls: ['./room-details-view.component.scss']
})
export class RoomDetailsViewComponent implements OnInit {
  room?: Room | null;
  AmenitiesIconMapper = AmenitiesIconMapper;

  constructor(private route: ActivatedRoute,
              private roomsService: RoomsService,
              public reserveService: ReserveManagementService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.roomsService.getHotelRoomById(params['id']))
    ).subscribe(data => {
      this.room = data;
      this.reserveService.selectedRoom$.next(data);
    });
  }
}
