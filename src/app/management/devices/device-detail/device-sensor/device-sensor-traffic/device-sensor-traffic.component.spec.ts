import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSensorTrafficComponent } from './device-sensor-traffic.component';

describe('DeviceSensorTrafficComponent', () => {
  let component: DeviceSensorTrafficComponent;
  let fixture: ComponentFixture<DeviceSensorTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSensorTrafficComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSensorTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
