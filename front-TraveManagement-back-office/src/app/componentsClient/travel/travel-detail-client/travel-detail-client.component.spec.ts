import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDetailClientComponent } from './travel-detail-client.component';

describe('TravelDetailClientComponent', () => {
  let component: TravelDetailClientComponent;
  let fixture: ComponentFixture<TravelDetailClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelDetailClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelDetailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
