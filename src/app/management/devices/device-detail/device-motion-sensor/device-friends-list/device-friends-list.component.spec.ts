import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFriendsListComponent } from './device-friends-list.component';

describe('DeviceFriendsListComponent', () => {
  let component: DeviceFriendsListComponent;
  let fixture: ComponentFixture<DeviceFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceFriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
