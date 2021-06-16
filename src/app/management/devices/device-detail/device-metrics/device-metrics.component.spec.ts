import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMetricsComponent } from './device-metrics.component';

describe('DeviceMetricsComponent', () => {
  let component: DeviceMetricsComponent;
  let fixture: ComponentFixture<DeviceMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
