import { Component, OnInit } from '@angular/core';
import { User } from '~local/types'
import { UserService } from '~local/services/user.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { USERS } from '~local/../assets/data/users'

@Component({
  selector: 'autocomplete-user',
  templateUrl: './autocomplete-user.component.html',
  styleUrls: ['./autocomplete-user.component.scss']
})
export class AutocompleteUserComponent implements OnInit {
  myControl = new FormControl();
  options: User[] = USERS;
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
