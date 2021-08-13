import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialisationLampComponent } from './initialisation-lamp.component';

describe('InitialisationLampComponent', () => {
  let component: InitialisationLampComponent;
  let fixture: ComponentFixture<InitialisationLampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialisationLampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialisationLampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
