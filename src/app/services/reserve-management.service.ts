import { Injectable } from '@angular/core';
import { Room } from "../components/room-card/room.modal";
import * as moment from "moment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReserveManagementService {
  selectedReservationDate?: [Date, Date];
  selectedRoom$ = new BehaviorSubject<Room | null>(null)
  numberOfDays?: number;
  totalCost?: number;

  constructor() {
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
}
