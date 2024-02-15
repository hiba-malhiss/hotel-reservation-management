import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'app-subscription-manager'
})
export class SubscriptionManagerComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
