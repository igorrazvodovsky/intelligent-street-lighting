import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceModelDialogComponent } from '~local/shared/device-model-dialog/device-model-dialog.component';

@Component({
  selector: 'device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent {

  constructor(public dialog: MatDialog) { }

  openModelDialog() {
    const dialogRef = this.dialog.open(DeviceModelDialogComponent, {
      id: 'device-model-dialog',
      data: { id: 1 },
    });
  }

}
