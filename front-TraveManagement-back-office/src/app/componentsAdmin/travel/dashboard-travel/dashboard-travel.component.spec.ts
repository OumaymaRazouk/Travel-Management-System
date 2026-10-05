import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTravelComponent } from './dashboard-travel.component';

describe('DashboardTravelComponent', () => {
  let component: DashboardTravelComponent;
  let fixture: ComponentFixture<DashboardTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
