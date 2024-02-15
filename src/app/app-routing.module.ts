import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { RoomsViewComponent } from "./views/rooms-view/rooms-view.component";
import { RoomDetailsViewComponent } from "./views/room-details-view/room-details-view.component";
import { AttractionsViewComponent } from "./views/attractions-view/attractions-view.component";
import { ManageReservationsViewComponent } from "./views/manage-reservations-view/manage-reservations-view.component";

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeViewComponent
  },
  {
    path: 'rooms',
    component: RoomsViewComponent
  },
  {
    path: 'rooms/:id',
    component: RoomDetailsViewComponent
  },
  {
    path: 'attractions',
    component: AttractionsViewComponent
  },
  {
    path: 'reservations',
    component: ManageReservationsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
