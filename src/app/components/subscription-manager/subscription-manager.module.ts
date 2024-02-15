import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionManagerComponent } from "./subscription-manager.component";

@NgModule({
  declarations: [SubscriptionManagerComponent],
  exports: [SubscriptionManagerComponent],
  imports: [
    CommonModule
  ]
})
export class SubscriptionManagerModule { }
