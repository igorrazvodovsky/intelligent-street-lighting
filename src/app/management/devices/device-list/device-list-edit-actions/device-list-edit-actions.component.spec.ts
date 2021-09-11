import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListEditActionsComponent } from './device-list-edit-actions.component';

describe('DeviceListEditActionsComponent', () => {
  let component: DeviceListEditActionsComponent;
  let fixture: ComponentFixture<DeviceListEditActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceListEditActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListEditActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
