import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Task } from '~local/types'
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { DeviceService } from '~local/services/device.service';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() task!: Task;
  @Input() deviceInfo: boolean = true;
  deviceName: string;
  groupName: string;

  constructor(
    public dialog: MatDialog,
    private deviceService: DeviceService,
  ) { }

  ngOnInit(): void {
    if (this.deviceInfo) {
      this.deviceService.getDevice(this.task.deviceId).pipe(
        filter(d => !!d),
        switchMap(device => {
          this.deviceName = device.name;
          return this.deviceService.getGroup(device.groupId);
        }),
        filter(g => !!g),
        takeUntil(this.destroy$)
      ).subscribe(group => {
        this.groupName = group.name;
      });
    }
  }

  openDialog(task: Task) {
    this.dialog.open(TaskDialogComponent, {
      id: 'task-dialog',
      data: { task: task },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
