import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '~local/types'
import { UserService } from '~local/services/user.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'autocomplete-user',
  templateUrl: './autocomplete-user.component.html',
  styleUrls: ['./autocomplete-user.component.scss']
})
export class AutocompleteUserComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  myControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.Users.pipe(
      takeUntil(this.destroy$)
    ).subscribe(users => this.options = users);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
