import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Device, DeviceGroup, Task } from '~local/types';
import { DeviceService } from '~local/services/device.service';

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  device$: Observable<{ device: Device, group?: DeviceGroup }>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private deviceService: DeviceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.device$ = this.deviceService.getDevice(this.data.task.deviceId).pipe(
      switchMap(device => !device ? of(null) :
        this.deviceService.getGroup(device.groupId).pipe(
          map(group => ({ device, group }))
        )
      )
    );
  }

  openDevice(device: Device, showOnMap = false) {
    this.dialogRef.close();
    this.router.navigate(['/management/devices/device', device.id], {
      queryParams: showOnMap ? { show: 'map' } : {}
    });
  }
}
