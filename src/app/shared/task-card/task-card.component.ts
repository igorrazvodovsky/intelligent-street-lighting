import { Component, Input, OnInit } from '@angular/core';
import { Task } from '~local/types'
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { DeviceService } from '~local/services/device.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
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
        filter(d => !!d)
      ).subscribe(device => {
        this.deviceName = device.name;
        this.deviceService.getGroup(device.groupId).pipe(
          filter(g => !!g)
        ).subscribe(group => {
          this.groupName = group.name;
        });
      });
    }
  }

  openDialog(task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      id: 'task-dialog',
      data: { task: task },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
