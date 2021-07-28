import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteUserComponent } from './autocomplete-user.component';

describe('AutocompleteUserComponent', () => {
  let component: AutocompleteUserComponent;
  let fixture: ComponentFixture<AutocompleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
