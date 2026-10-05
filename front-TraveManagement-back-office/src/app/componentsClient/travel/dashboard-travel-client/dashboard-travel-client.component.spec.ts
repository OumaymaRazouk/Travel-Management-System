import { ComponentFixture, TestBed } from '@angular/core/testing';

import {DashboardTravelClientComponent} from './dashboard-travel-client.component';

describe('DashboardTravelClientComponent', () => {
  let component: DashboardTravelClientComponent;
  let fixture: ComponentFixture<DashboardTravelClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTravelClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTravelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
