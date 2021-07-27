import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEventComponent } from './device-event.component';

describe('DeviceEventComponent', () => {
  let component: DeviceEventComponent;
  let fixture: ComponentFixture<DeviceEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
