import { Component, Input, OnInit } from '@angular/core';
import { ReserveManagementService } from "../../../services/reserve-management.service";
import * as moment from "moment";
import { Room } from "../../../components/room-card/room.modal";

@Component({
  selector: 'hrm-reserve-calendar',
  templateUrl: './reserve-calendar.component.html',
  styleUrls: ['./reserve-calendar.component.scss']
})
export class ReserveCalendarComponent implements OnInit {
  disabledDates: Date[] = []
  // @ts-ignore
  minEnabledDate: Date;
  // @ts-ignore
  maxEnabledDate: Date;

  @Input()
  inline: boolean = false;

  @Input()
  fullWidth: boolean = false;

  constructor(public reserveService: ReserveManagementService) {
  }

  ngOnInit(): void {
    this.reserveService.selectedRoom$.subscribe((room) => {
      this.setDisabledDates(room)
    })
  }

  // p-calender doesn't accept enabled dates it only accept disabled dates
  // this function calculate minimum enables and max enabled from available date
  // and set an array of disabled dates that overlap it
  setDisabledDates(room: Room | null) {
    const enabledDates = room?.availableDates || [];
    const minEnabled = moment.min(enabledDates);
    const maxEnabled = moment.max(enabledDates);
    const isEnabledDate = (date: moment.Moment) =>
      enabledDates.some(enabledDate => enabledDate.isSame(date, 'day'));

    const start = minEnabled.clone().subtract(1, 'day');
    const end = maxEnabled.clone().add(1, 'day');

    this.disabledDates = [];
    while (start.isBefore(end, 'day')) {
      let date = start.clone();
      if (!isEnabledDate(date)) {
        this.disabledDates.push(date.toDate())
      }
      start.add(1, 'day');
    }

    this.minEnabledDate = minEnabled.toDate();
    this.maxEnabledDate = maxEnabled.toDate();
  }

  // p-calender allows selecting a date range that includes disabled dates
  // this reset the selected dates if the range includes disabled dates
  onSelect(value: [Date, Date]) {
    this.reserveService.selectedReservationDate = value;
    if (value[0] && value[1]) {
      let selectedStartDate = moment(value[0])
      let selectedEndDate = moment(value[1])
      const isDisabledDates = (date: moment.Moment) =>
        this.disabledDates.some(disabledDate => moment(disabledDate).isSame(date, 'day'));

      while (selectedStartDate.isBefore(selectedEndDate, 'day')) {
        let date = selectedStartDate.clone();
        if (isDisabledDates(date)) {
          this.reserveService.selectedReservationDate = null;
          return;
        }
        selectedStartDate.add(1, 'day');
      }
      this.reserveService.onReservationDatesSelect()
    }
  }
}