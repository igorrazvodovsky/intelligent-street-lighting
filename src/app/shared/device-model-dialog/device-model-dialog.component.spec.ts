import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelDialogComponent } from './device-model-dialog.component';

describe('DeviceModelDialogComponent', () => {
  let component: DeviceModelDialogComponent;
  let fixture: ComponentFixture<DeviceModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceModelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
