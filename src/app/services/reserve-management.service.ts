import { Injectable } from '@angular/core';
import { Room } from "../components/room-card/room.modal";
import * as moment from "moment";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { Reservation } from "../modals/roomsData.modal";
import { roomsMockData } from "./rooms-mock-data";
import { checkIfValidReservation } from "./room-backend.util";

@Injectable({
  providedIn: 'root'
})
export class ReserveManagementService {
  selectedReservationDate?: [Date, Date] | null;
  selectedRoom$ = new BehaviorSubject<Room | null>(null)
  numberOfDays?: number;
  totalCost?: number;

  constructor(private authService: AuthService) {
  }


  resetReservationData() {
    this.selectedReservationDate = null;
    this.selectedRoom$.next(null);
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
    this.totalCost = this.numberOfDays * this.selectedRoom$.value!.price
  }


  onReserveRoom(): Observable<boolean> {
    const user = this.authService.currentUser$.value;
    if (this.selectedRoom$.value && this.selectedReservationDate && user) {
      let payload: Reservation = {
        id: Math.random(),
        roomId: this.selectedRoom$.value.id,
        startDate: moment(this.selectedReservationDate[0]).format('YYYY-MM-DD'),
        endDate: moment(this.selectedReservationDate[1]).format('YYYY-MM-DD'),
        guestName: user?.name
      }

      return this.reserveRoom(payload)
    } else {
      return throwError("Invalid response")
    }
  }

  private reserveRoom(payload: Reservation): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (checkIfValidReservation(payload)) {
          roomsMockData.reservations.push(payload);
          observer.next(true);
          observer.complete();
        } else {
          observer.error("");
          observer.complete();
        }
      }, 500);
    })
  }

}
