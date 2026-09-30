import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeviceModel } from '~local/types';
import { DeviceService } from '~local/services/device.service';
import { DeviceModelDialogComponent } from '~local/shared/device-model-dialog/device-model-dialog.component';

@Component({
  selector: 'app-device-models',
  templateUrl: './device-models.component.html',
  styleUrls: ['./device-models.component.scss']
})
export class DeviceModelsComponent {
  models$: Observable<DeviceModel[]> = this.deviceService.Models

  constructor(public dialog: MatDialog, private deviceService: DeviceService) { }

  openDialog(model: DeviceModel) {
    this.dialog.open(DeviceModelDialogComponent, {
      id: 'device-model-dialog',
      data: { name: model.name },
    });
  }

}
