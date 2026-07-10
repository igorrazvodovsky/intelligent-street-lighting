import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile } from '~local/types'
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '~local/services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { NameDialogComponent } from '~local/shared/name-dialog/name-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'profile-list',
  templateUrl: './profile-list.component.html'
})
export class ProfileListComponent implements OnInit, OnDestroy {
  profiles!: Profile[];
  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private service: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.Profiles.pipe(takeUntil(this.destroy$)).subscribe(profiles => {
      this.profiles = profiles
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      // TODO: Navigate to created profile
      if (result) this.router.navigate(['6'], { relativeTo: this.route });
    });

  }
}
