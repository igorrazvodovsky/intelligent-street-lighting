import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialisationLocationComponent } from './initialisation-location.component';

describe('InitialisationLocationComponent', () => {
  let component: InitialisationLocationComponent;
  let fixture: ComponentFixture<InitialisationLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialisationLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialisationLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
