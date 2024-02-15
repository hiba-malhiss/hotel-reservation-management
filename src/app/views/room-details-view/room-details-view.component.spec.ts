import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailsViewComponent } from './room-details-view.component';

describe('RoomDetailsViewComponent', () => {
  let component: RoomDetailsViewComponent;
  let fixture: ComponentFixture<RoomDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailsViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
