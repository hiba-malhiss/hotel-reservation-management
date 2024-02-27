import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ReserveManagementService } from '../../../services/reserve-management/reserve-management.service';
import * as moment from 'moment';
import { Room } from '../../../components/room-card/room.modal';
import { Calendar } from 'primeng/calendar';
import { SubscriptionManagerComponent } from '../../../components/subscription-manager/subscription-manager.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'hrm-reserve-calendar',
  templateUrl: './reserve-calendar.component.html',
  styleUrls: ['./reserve-calendar.component.scss']
})
export class ReserveCalendarComponent
  extends SubscriptionManagerComponent
  implements OnInit
{
  disabledDates: Date[] = [];
  minEnabledDate!: Date;
  maxEnabledDate!: Date;

  disableScroll: boolean = true;

  @ViewChild('calendar')
  private calendar?: Calendar;

  @Input()
  inline: boolean = false;

  @Input()
  fullWidth: boolean = false;

  constructor(public reserveService: ReserveManagementService) {
    super();
  }

  ngOnInit(): void {
    this.reserveService.selectedRoom$
      .pipe(takeUntil(this.destroy$))
      .subscribe(room => {
        this.setDisabledDates(room);
      });

    this.reserveService.fetchDiscountConfigs().subscribe((data) => {
      this.reserveService.discountsConfigs = data
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
      // obj pass by ref
      let date = start.clone();
      if (!isEnabledDate(date)) {
        this.disabledDates.push(date.toDate());
      }
      start.add(1, 'day');
    }

    this.minEnabledDate = minEnabled.toDate();
    this.maxEnabledDate = maxEnabled.toDate();
    // workaround: the calendar causes the page to scroll into the calendar view when we set the defaultValue
    // so prevent scrolling then enables it after setting the defaultValue by 1sec
    setTimeout(() => {
      this.disableScroll = false;
    }, 1000);
  }

  // p-calender allows selecting a date range that includes disabled dates
  // this reset the selected dates if the range includes disabled dates
  onSelect(value: [Date, Date]) {
    this.reserveService.selectedReservationDate = value;
    if (value[0] && value[1]) {
      let selectedStartDate = moment(value[0]);
      let selectedEndDate = moment(value[1]);
      const isDisabledDates = (date: moment.Moment) =>
        this.disabledDates.some(disabledDate =>
          moment(disabledDate).isSame(date, 'day')
        );

      // end date selected can't be disabled
      while (selectedStartDate.isBefore(selectedEndDate, 'day')) {
        let date = selectedStartDate.clone();
        if (isDisabledDates(date)) {
          this.reserveService.selectedReservationDate = null;
          return;
        }
        selectedStartDate.add(1, 'day');
      }
      // behavioral subject + subscribe
      this.reserveService.onReservationDatesSelect();
      this.calendar?.hideOverlay();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.disableScroll) {
      window.scrollTo(0, 0);
    }
  }
}
