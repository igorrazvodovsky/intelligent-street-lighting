import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
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
    private appStateService: AppStateService,
    private route: ActivatedRoute
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

    // "Show on map" from a task: on phones the list covers the map, so hide it
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (this.isHandset && params.get('show') === 'map') this.opened = false;
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
