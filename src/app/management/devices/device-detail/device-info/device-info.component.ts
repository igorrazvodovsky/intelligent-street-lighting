import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device, DeviceModel } from '~local/types';
import { DeviceService } from '~local/services/device.service';
import { DeviceModelDialogComponent } from '~local/shared/device-model-dialog/device-model-dialog.component';

interface DeviceInfo {
  model?: DeviceModel
  serial: string
  address: string
  controllerAddress?: string
}

// Fixtures carry no serials or network addresses, so make them up from the id:
// stable across reloads and different for every device
function hexFromId(id: number, words: number): string {
  return Array.from({ length: words }, (_, i) =>
    (Math.imul(id * 31 + i, 2654435761) >>> 0).toString(16).padStart(8, '0')
  ).join('');
}

const address = (device: Device) => `dev:${device.type === 'sc' ? 'sc' : 'lc'}${String(device.id).padStart(5, '0')}`;

@Component({
  selector: 'device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnChanges {
  @Input() device: Device;
  info$: Observable<DeviceInfo>;

  constructor(public dialog: MatDialog, private deviceService: DeviceService) { }

  ngOnChanges() {
    this.info$ = combineLatest([
      this.deviceService.getModel(this.device.model),
      this.deviceService.Devices,
      this.deviceService.Groups,
    ]).pipe(
      map(([model, devices, groups]) => {
        const controller = this.device.type === 'sc' ? undefined
          : this.deviceService.getSegmentController(this.device, devices, groups);
        return {
          model,
          serial: hexFromId(this.device.id, 4).toUpperCase(),
          address: address(this.device),
          controllerAddress: controller && `DEV:TB${hexFromId(controller.id, 4)}`,
        };
      })
    );
  }

  openModelDialog() {
    this.dialog.open(DeviceModelDialogComponent, {
      id: 'device-model-dialog',
      data: { name: this.device.model },
    });
  }

}
