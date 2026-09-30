import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment, Device, DeviceEvent, DeviceGroup, Task } from '~local/types';
import { DeviceService } from '~local/services/device.service';
import { EventService } from '~local/services/event.service';

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  device$: Observable<{ device: Device, group?: DeviceGroup }>;
  event$: Observable<DeviceEvent | undefined>;
  comments: Comment[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private deviceService: DeviceService,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.device$ = this.deviceService.getDeviceWithGroup(this.data.task.deviceId);
    const eventId = this.data.task.eventId;
    this.event$ = eventId == null ? of(undefined) : this.eventService.getDeviceEvents().pipe(
      map(events => events.find(event => event.id === eventId))
    );
    this.comments = this.data.task.comments ?? [];
  }

  openDevice(device: Device, showOnMap = false) {
    this.dialogRef.close();
    this.router.navigate(['/management/devices/device', device.id], {
      queryParams: showOnMap ? { show: 'map' } : {}
    });
  }
}
