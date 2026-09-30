import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeviceModel } from '~local/types';
import { DeviceService } from '~local/services/device.service';

@Component({
  selector: 'app-device-model-dialog',
  templateUrl: './device-model-dialog.component.html',
  styleUrls: ['./device-model-dialog.component.scss']
})
export class DeviceModelDialogComponent implements OnInit {
  model$: Observable<DeviceModel | undefined>

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.model$ = this.deviceService.getModel(this.data.name)
  }

}
