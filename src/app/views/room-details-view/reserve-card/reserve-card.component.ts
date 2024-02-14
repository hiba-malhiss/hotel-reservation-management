import { Component, OnInit } from '@angular/core';
import { ReserveManagementService } from "../../../services/reserve-management.service";

@Component({
  selector: 'hrm-reserve-card',
  templateUrl: './reserve-card.component.html',
  styleUrls: ['./reserve-card.component.scss']
})
export class ReserveCardComponent implements OnInit {

  constructor(public reserveService: ReserveManagementService) {
  }

  ngOnInit(): void {
  }

  onReserve() {
    console.log(this.reserveService.selectedReservationDate)
  }

}
