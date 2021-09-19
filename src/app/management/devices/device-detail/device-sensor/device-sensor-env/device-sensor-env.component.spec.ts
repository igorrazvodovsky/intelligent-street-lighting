import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSensorEnvComponent } from './device-sensor-env.component';

describe('DeviceSensorEnvComponent', () => {
  let component: DeviceSensorEnvComponent;
  let fixture: ComponentFixture<DeviceSensorEnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSensorEnvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSensorEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
