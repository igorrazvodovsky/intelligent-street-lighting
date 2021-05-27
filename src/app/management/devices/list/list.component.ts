import { Component, OnInit } from '@angular/core';
import { DeviceGroup } from '../../../types'


@Component({
  selector: 'devices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
