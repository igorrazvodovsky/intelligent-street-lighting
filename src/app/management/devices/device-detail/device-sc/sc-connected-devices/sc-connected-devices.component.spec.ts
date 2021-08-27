import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScConnectedDevicesComponent } from './sc-connected-devices.component';

describe('ScConnectedDevicesComponent', () => {
  let component: ScConnectedDevicesComponent;
  let fixture: ComponentFixture<ScConnectedDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScConnectedDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScConnectedDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
