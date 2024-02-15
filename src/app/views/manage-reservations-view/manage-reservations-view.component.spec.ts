import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReservationsViewComponent } from './manage-reservations-view.component';

describe('ManageReservationsViewComponent', () => {
  let component: ManageReservationsViewComponent;
  let fixture: ComponentFixture<ManageReservationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageReservationsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReservationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
