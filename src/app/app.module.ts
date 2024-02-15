import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewModule } from "./views/home-view/home-view.module";
import { CssResetModule } from "../ui-kit/components/css-reset/src/css-reset.module";
import { AppBarModule } from "./components/app-bar/app-bar.module";
import { RoomsViewModule } from "./views/rooms-view/rooms-view.module";
import { RoomDetailsViewModule } from "./views/room-details-view/room-details-view.module";
import { ToastModule } from "primeng/toast";
import { AttractionsViewModule } from "./views/attractions-view/attractions-view.module";
import { ManageReservationsViewModule } from "./views/manage-reservations-view/manage-reservations-view.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeViewModule,
    CssResetModule,
    RoomsViewModule,
    RoomDetailsViewModule,
    AppBarModule,
    AttractionsViewModule,
    ManageReservationsViewModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
