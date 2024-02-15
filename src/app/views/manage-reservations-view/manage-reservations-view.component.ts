import { Component, OnInit, ViewChild } from '@angular/core';
import { ReserveManagementService } from "../../services/reserve-management/reserve-management.service";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { UserReservation } from "../../modals/roomsData.modal";
import { catchError } from "rxjs";
import { Table } from "primeng/table";

const RoomStatusMapper = {
  InProgress: "In Progress",
  Completed: "Completed",
}

@Component({
  selector: 'app-manage-reservations-view',
  templateUrl: './manage-reservations-view.component.html',
  styleUrls: ['./manage-reservations-view.component.scss']
})
export class ManageReservationsViewComponent implements OnInit {
  pageSize = 2;
  totalRecords = 0;
  userReservations: UserReservation[] = [];
  RoomStatusMapper = RoomStatusMapper;
  isLoadingReservations = false;

  @ViewChild('table')
  table?: Table;

  columns = [
    { field: 'image', header: 'Image' },
    { field: 'roomNumber', header: 'Room Number' },
    { field: 'startDate', header: 'Check in' },
    { field: 'endDate', header: 'Check out' },
    { field: 'status', header: 'Status' },
    { field: '', header: '' },
  ];

  constructor(public reserveService: ReserveManagementService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.fetchReservations()
  }

  fetchReservations(event?: LazyLoadEvent) {
    // @ts-ignore
    const page = event ? (event?.first / event?.rows + 1) : 1;
    this.isLoadingReservations = true;
    this.reserveService.getUserReservation(page, this.pageSize)
    .pipe(catchError((err) => {
      this.isLoadingReservations = false;
      throw err;
    }))
    .subscribe((data) => {
      this.userReservations = data.userReservations;
      this.totalRecords = data.totalRecords;
      this.isLoadingReservations = false;
    })
  }

  onCancelReservation(userReservation: UserReservation) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel?',
      accept: () => {
        this.isLoadingReservations = true;
        this.reserveService.deleteUserReservation(userReservation.id)
        .pipe(catchError((err) => {
          this.isLoadingReservations = false;
          throw err;
        }))
        .subscribe(() => {
          this.isLoadingReservations = false;
          if (this.table) // reset pagination
            this.table.first = 0;
          this.fetchReservations();
        })
      }
    });
  }
}
