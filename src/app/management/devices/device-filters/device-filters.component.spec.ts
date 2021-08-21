import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFiltersComponent } from './device-filters.component';

describe('DeviceFiltersComponent', () => {
  let component: DeviceFiltersComponent;
  let fixture: ComponentFixture<DeviceFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
