import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from '~local/services/city.service'
import { DeviceService } from '~local/services/device.service'
import { Observable } from 'rxjs';
import { DeviceGroup } from '~local/types'

@Component({
  selector: 'group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  parent: string = "root"
  cityName: string
  groups$: Observable<DeviceGroup[]>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: any },
    private cityService: CityService,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.cityName = this.cityService.city.name
    this.groups$ = this.deviceService.Groups
  }

}
