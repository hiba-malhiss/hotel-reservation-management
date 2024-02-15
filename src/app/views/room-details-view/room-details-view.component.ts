import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RoomsService } from "../../services/room/rooms.service";
import { Room } from "../../components/room-card/room.modal";
import { BehaviorSubject, catchError, combineLatest, switchMap, takeUntil, tap } from "rxjs";
import { AmenitiesIconMapper } from "../../modals/roomsData.modal";
import { ReserveManagementService } from "../../services/reserve-management/reserve-management.service";
import { AuthService } from "../../services/auth/auth.service";
import { MessageService } from "primeng/api";
import { SubscriptionManagerComponent } from "../../components/subscription-manager/subscription-manager.component";

@Component({
  selector: 'app-room-details-view',
  templateUrl: './room-details-view.component.html',
  styleUrls: ['./room-details-view.component.scss']
})
export class RoomDetailsViewComponent extends SubscriptionManagerComponent implements OnInit, OnDestroy {
  room?: Room | null;
  AmenitiesIconMapper = AmenitiesIconMapper;
  isReservingRoom = false;
  isLoadingRoomDetails = false;
  refreshRoom$ = new BehaviorSubject(true);

  constructor(private route: ActivatedRoute,
              private roomsService: RoomsService,
              private router: Router,
              private messageService: MessageService,
              private authService: AuthService,
              public reserveService: ReserveManagementService) {
    super();
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.refreshRoom$])
    .pipe(
      takeUntil(this.destroy$),
      tap(() => this.isLoadingRoomDetails = true),
      switchMap(([params]) => this.roomsService.getHotelRoomById(params['id'])),
      catchError((err) => {
        this.isLoadingRoomDetails = false;
        throw err;
      })
    )
    .subscribe(data => {
      this.room = data;
      this.reserveService.selectedRoom$.next(data);
      this.isLoadingRoomDetails = false;
    });
  }

  onReserve() {
    if (this.authService.isUserLoggedIn()) {
      this.isReservingRoom = true;
      this.reserveService.onReserveRoom()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
        this.isReservingRoom = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Sorry! these dates already booked" });
        this.reserveService.resetReservationData();
        this.refreshRoom$.next(true);
        throw err
      }))
      .subscribe(() => {
        this.isReservingRoom = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Reserves Successfully!',
          detail: "Your reserve-management is completed!"
        });
        this.router.navigateByUrl("/") //todo: navigate to bookings page
      });
    } else {
      this.authService.isLoginVisible$.next(true);
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy()
    this.reserveService.resetReservationDetails();
  }
}
