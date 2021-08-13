import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialisationScComponent } from './initialisation-sc.component';

describe('InitialisationScComponent', () => {
  let component: InitialisationScComponent;
  let fixture: ComponentFixture<InitialisationScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialisationScComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialisationScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
