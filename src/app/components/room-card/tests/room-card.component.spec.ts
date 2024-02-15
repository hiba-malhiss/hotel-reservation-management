import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RoomCardComponent } from '../room-card.component';
import { By } from '@angular/platform-browser';
import { roomMockData } from "./room-card-mock-data";
import { RoomCardModule } from "../room-card.module";

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let fixture: ComponentFixture<RoomCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RoomCardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct room number and type', () => {
    component.room = roomMockData;
    fixture.detectChanges();

    const headerElement = fixture.debugElement.query(By.css('.p-card-title')).nativeElement;
    const subheaderElement = fixture.debugElement.query(By.css('.p-card-subtitle')).nativeElement;

    expect(headerElement.textContent.trim()).toBe('Room 101');
    expect(subheaderElement.textContent.trim()).toBe('Standard');
  });

  it('should render correct text based on room availability', () => {
    component.room = roomMockData;
    fixture.detectChanges();

    let contentElement = fixture.debugElement.query(By.css('.RoomCard-available'));
    expect(contentElement.nativeElement.textContent.trim()).toBe('Available from: 2024-01-01');

    component.room = {
      ...roomMockData,
      nextAvailableDate: null
    };

    fixture.detectChanges();
    contentElement = fixture.debugElement.query(By.css('.RoomCard-notAvail'));
    expect(contentElement.nativeElement.textContent.trim()).toBe('Room is fully booked');
  });

  it('should call navigateToRoomDetails() method on card click', () => {
    component.room = roomMockData;
    spyOn(component, 'navigateToRoomDetails');
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('.RoomCard'));
    cardElement.triggerEventHandler('click', null);
    expect(component.navigateToRoomDetails).toHaveBeenCalled();
  });
});
