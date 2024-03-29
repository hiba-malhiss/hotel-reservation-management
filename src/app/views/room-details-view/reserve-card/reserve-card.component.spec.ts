import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveCardComponent } from './reserve-card.component';

describe('ReserveCardComponent', () => {
  let component: ReserveCardComponent;
  let fixture: ComponentFixture<ReserveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReserveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
