import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileScheduleDynamicComponent } from './profile-schedule-dynamic.component';

describe('ProfileScheduleDynamicComponent', () => {
  let component: ProfileScheduleDynamicComponent;
  let fixture: ComponentFixture<ProfileScheduleDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileScheduleDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileScheduleDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
