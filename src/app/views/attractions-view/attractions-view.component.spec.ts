import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsViewComponent } from './attractions-view.component';

describe('AttractionsViewComponent', () => {
  let component: AttractionsViewComponent;
  let fixture: ComponentFixture<AttractionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
