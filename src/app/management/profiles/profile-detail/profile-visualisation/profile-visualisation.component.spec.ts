import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisualisationComponent } from './profile-visualisation.component';

describe('ProfileVisualisationComponent', () => {
  let component: ProfileVisualisationComponent;
  let fixture: ComponentFixture<ProfileVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
