import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMetricsChartComponent } from './device-metrics-chart.component';

describe('DeviceMetricsChartComponent', () => {
  let component: DeviceMetricsChartComponent;
  let fixture: ComponentFixture<DeviceMetricsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceMetricsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMetricsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
