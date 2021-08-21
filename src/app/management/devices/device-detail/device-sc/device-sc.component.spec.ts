import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceScComponent } from './device-sc.component';

describe('DeviceScComponent', () => {
  let component: DeviceScComponent;
  let fixture: ComponentFixture<DeviceScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceScComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
