import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from "./app-bar.component";
import { ButtonModule } from "primeng/button";
import { FlexboxModule } from "../../../ui-kit/components/flexbox/src/flexbox.module";
import { MenuModule } from "primeng/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppBarComponent],
  exports: [
    AppBarComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FlexboxModule,
    BrowserAnimationsModule,
    MenuModule
  ]
})
export class AppBarModule { }
