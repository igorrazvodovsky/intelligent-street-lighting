// TODO: Unsubscribe from stuff onDestroy

import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
export class DevicesComponent implements OnInit {
  mapPosition: MapPosition
  opened: boolean
  maximized: boolean = false
  isHandset: boolean

  constructor(
    public dialog: MatDialog,
    private appStateService: AppStateService
  ) { }


  openDialog() {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      id: 'group-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.appStateService.isHandset.subscribe(value =>
      this.isHandset = value
    );
  }

  public toggleMaximize() {
    this.maximized = !this.maximized
  }
}
