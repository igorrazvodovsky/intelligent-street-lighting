import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UsersDataSource } from './users-datasource';
import { User } from '~local/types'
import { UserService } from '~local/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: UsersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'status', 'enabled', 'locked'];

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.dataSource = new UsersDataSource(this.userService);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openDialog() {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      id: 'invite-dialog'
    });
  }
}
