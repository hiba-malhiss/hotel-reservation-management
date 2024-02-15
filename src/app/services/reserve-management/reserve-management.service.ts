import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {
  Reservation,
  UserReservationResponse
} from '../../modals/roomsData.modal';
import {
  addRoomsReservations,
  deleteRoomsReservations
} from '../room/rooms-mock-data';
import {
  checkIfValidReservation,
  DATE_FORMAT,
  getUserReservations
} from '../room/room-backend.util';
import { Room } from '../../components/room-card/room.modal';

@Injectable({
  providedIn: 'root'
})
export class ReserveManagementService {
  selectedReservationDate?: [Date, Date] | null;
  selectedRoom$ = new BehaviorSubject<Room | null>(null);
  numberOfDays?: number;
  totalCost?: number;

  constructor(private authService: AuthService) {}

  resetReservationDetails() {
    this.selectedRoom$.next(null);
    this.resetReservationData();
  }

  resetReservationData() {
    this.selectedReservationDate = null;
    this.numberOfDays = 0;
    this.totalCost = 0;
  }

  get selectedRoom() {
    return this.selectedRoom$.value;
  }

  onReservationDatesSelect() {
    const [startDate, endDate] = this.selectedReservationDate || [];
    if (startDate && endDate) {
      const difference = moment(endDate).diff(moment(startDate), 'days');
      this.numberOfDays = Math.abs(difference);
    } else {
      this.numberOfDays = 0;
    }

    // use big decimal for fractions
    this.totalCost = this.numberOfDays * this.selectedRoom$.value!.price;
  }

  onReserveRoom(): Observable<boolean> {
    const user = this.authService.currentUser$.value;
    if (this.selectedRoom$.value && this.selectedReservationDate && user) {
      let payload: Reservation = {
        id: Math.random(),
        roomId: this.selectedRoom$.value.id,
        startDate: moment(this.selectedReservationDate[0]).format(DATE_FORMAT),
        endDate: moment(this.selectedReservationDate[1]).format(DATE_FORMAT),
        guestName: user?.name
      };

      return this.reserveRoom(payload);
    } else {
      // deprecated no replacement, we need to throw inside observable
      return throwError('Invalid response');
    }
  }

  private reserveRoom(payload: Reservation): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        if (checkIfValidReservation(payload)) {
          addRoomsReservations(payload);
          observer.next(true);
          observer.complete();
        } else {
          observer.error('');
          observer.complete();
        }
      }, 800);
    });
  }

  getUserReservation(
    page: number,
    pageSize: number
  ): Observable<UserReservationResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        let reservations = getUserReservations(
          this.authService.currentUser$.value!.name,
          page,
          pageSize
        );
        observer.next(reservations);
        observer.complete();
      }, 800);
    });
  }

  // this should change the reservation status not delete the reservation
  deleteUserReservation(
    reservationId: number
  ): Observable<UserReservationResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        deleteRoomsReservations(reservationId);
        observer.next();
        observer.complete();
      }, 800);
    });
  }
}
