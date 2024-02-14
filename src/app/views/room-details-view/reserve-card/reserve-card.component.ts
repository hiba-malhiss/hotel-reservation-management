import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReserveManagementService } from "../../../services/reserve-management.service";

@Component({
  selector: 'hrm-reserve-card',
  templateUrl: './reserve-card.component.html',
  styleUrls: ['./reserve-card.component.scss']
})
export class ReserveCardComponent implements OnInit {
  @Output()
  public reserve = new EventEmitter();

  constructor(public reserveService: ReserveManagementService) {
  }

  ngOnInit(): void {
  }


}
