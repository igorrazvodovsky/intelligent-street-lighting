import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMotionSensorComponent } from './device-motion-sensor.component';

describe('DeviceMotionSensorComponent', () => {
  let component: DeviceMotionSensorComponent;
  let fixture: ComponentFixture<DeviceMotionSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceMotionSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMotionSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
