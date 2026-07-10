import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GroupDialogComponent } from './group-dialog/group-dialog.component'
import { AppStateService } from '~local/services/app-state.service'

type MapPosition = {
  lat: number,
  lng: number,
  zoom: number
}

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {
  mapPosition: MapPosition
  opened: boolean
  maximized: boolean = false
  isHandset: boolean
  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private appStateService: AppStateService
  ) { }


  openDialog() {
    this.dialog.open(GroupDialogComponent, {
      id: 'group-dialog'
    });
  }

  ngOnInit() {
    this.appStateService.isHandset.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isHandset = value;
      this.opened = !value;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleMaximize() {
    this.maximized = !this.maximized
  }
}
