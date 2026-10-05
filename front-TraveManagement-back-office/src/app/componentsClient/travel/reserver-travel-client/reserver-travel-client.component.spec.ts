import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverTravelClientComponent } from './reserver-travel-client.component';

describe('ReserverTravelClientComponent', () => {
  let component: ReserverTravelClientComponent;
  let fixture: ComponentFixture<ReserverTravelClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserverTravelClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserverTravelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
