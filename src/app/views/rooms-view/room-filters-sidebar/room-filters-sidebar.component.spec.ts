import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFiltersSidebarComponent } from './room-filters-sidebar.component';

describe('RoomFiltersSidebarComponent', () => {
  let component: RoomFiltersSidebarComponent;
  let fixture: ComponentFixture<RoomFiltersSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomFiltersSidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomFiltersSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
