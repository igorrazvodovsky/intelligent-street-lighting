import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeviceListComponent } from './profile-device-list.component';

describe('ProfileDeviceListComponent', () => {
  let component: ProfileDeviceListComponent;
  let fixture: ComponentFixture<ProfileDeviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDeviceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
