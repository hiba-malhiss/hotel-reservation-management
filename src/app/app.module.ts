import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewModule } from "./home-view/home-view.module";
import { CssResetModule } from "../ui-kit/components/css-reset/src/css-reset.module";
import { AppBarModule } from "./components/app-bar/app-bar.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeViewModule,
    CssResetModule,
    AppBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
