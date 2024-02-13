import { Component, Input, OnInit } from '@angular/core';
import { Room } from "./room.modal";
import { Router } from "@angular/router";

@Component({
  selector: 'hrm-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {
  @Input()
  room!: Room;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  //todo
  navigateToRoomDetails() {
    this.router.navigate(["/rooms"])
  }

}
