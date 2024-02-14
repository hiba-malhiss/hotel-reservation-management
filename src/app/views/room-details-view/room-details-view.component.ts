import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RoomsService } from "../../services/rooms.service";
import { Room } from "../../components/room-card/room.modal";
import { catchError, switchMap } from "rxjs";
import { AmenitiesIconMapper } from "../../modals/roomsData.modal";
import { ReserveManagementService } from "../../services/reserve-management.service";
import { AuthService } from "../../services/auth.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-room-details-view',
  templateUrl: './room-details-view.component.html',
  styleUrls: ['./room-details-view.component.scss']
})
export class RoomDetailsViewComponent implements OnInit, OnDestroy {
  room?: Room | null;
  AmenitiesIconMapper = AmenitiesIconMapper;
  isReservingRoom = false;

  constructor(private route: ActivatedRoute,
              private roomsService: RoomsService,
              private router: Router,
              private messageService: MessageService,
              private authService: AuthService,
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

  onReserve() {
    if (this.authService.isUserLoggedIn()) {
      this.isReservingRoom = true;
      this.reserveService.onReserveRoom()
      .pipe(catchError((err) => {
        this.isReservingRoom = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error while reserving the room!" });
        throw err
      }))
      .subscribe(() => {
        this.isReservingRoom = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Reserves Successfully!',
          detail: "Your reservation is completed!"
        });
        this.router.navigateByUrl("/") //todo: navigate to bookings page
      });
    } else {
      this.authService.isLoginVisible$.next(true);
    }
  }

  ngOnDestroy(): void {
    this.reserveService.resetReservationData();
  }
}
