import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { RoomsViewComponent } from "./views/rooms-view/rooms-view.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
