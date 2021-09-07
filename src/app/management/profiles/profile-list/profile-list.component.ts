import { Component, OnInit } from '@angular/core';
import { Profile } from '~local/types'
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '~local/services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { NameDialogComponent } from '~local/shared/name-dialog/name-dialog.component';

@Component({
  selector: 'profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  profiles!: Profile[];

  constructor(
    public dialog: MatDialog,
    private service: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.Profiles.subscribe(profiles => {
      this.profiles = profiles
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      id: 'name-dialog',
      data: {
        name: "",
        edit: false,
        entity: "profile"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // TODO: Navigate to created profile
      if (result) this.router.navigate(['6'], { relativeTo: this.route });
    });

  }
}
