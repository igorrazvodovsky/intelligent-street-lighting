import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAlertsComponent } from './device-alerts.component';

describe('DeviceAlertsComponent', () => {
  let component: DeviceAlertsComponent;
  let fixture: ComponentFixture<DeviceAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
