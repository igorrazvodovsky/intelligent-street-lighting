import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { DeviceGroup, Device } from '../../../types'
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../../services/device.service';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  devices$!: Observable<Device[]>;
  selectedId = 0;
  groups: DeviceGroup[] = [
    {
        name: 'Dzelzceļnieks',
        lamps: 67,
        profile: 'Default'
    },
    {
      name: 'Cietoksnis',
      lamps: 12,
      profile: 'Default'
    },
    {
      name: 'Autoosta',
      lamps: 5,
      profile: 'Default'
  },
  {
    name: 'Group 3',
    lamps: 18,
    profile: 'Default'
  },
  {
    name: 'Lokomotīve',
    lamps: 25,
    profile: 'Default'
  },
  {
    name: 'Dzelzceļnieks',
    lamps: 67,
    profile: 'Default'
  },
  {
    name: 'Cietoksnis',
    lamps: 12,
    profile: 'Default'
  },
  {
    name: 'Autoosta',
    lamps: 5,
    profile: 'Default'
  },
  {
    name: 'Group 3',
    lamps: 18,
    profile: 'Default'
  },
  {
    name: 'Lokomotīve',
    lamps: 25,
    profile: 'Default'
  }
  ];

  constructor(
    private service: DeviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.devices$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this.service.getDevices();
      })
    );
  }

}
