import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'device-categories',
  templateUrl: './device-categories.component.html',
  styleUrls: ['./device-categories.component.scss']
})
export class DeviceCategoriesComponent {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<string[]>;
  categories: string[] = ['Lemon'];
  allCategories: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  isFocused: boolean = false;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allCategories.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.categories.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.categoryCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.categories.indexOf(fruit);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCategories.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  onFocus() {
    this.isFocused = true
  }
  onBlur() {
    this.isFocused = false
  }
}
