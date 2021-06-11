import { Component, OnInit } from '@angular/core';
import { DeviceGroup } from '../../../types'

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups: DeviceGroup[] = [
    {
      id: 1,
      name: 'Dzelzceļnieks',
      lamps: 67,
      profile: 'Default'
    },
    {
      id: 2,
      name: 'Cietoksnis',
      lamps: 12,
      profile: 'Default'
    },
    {
      id: 3,
      name: 'Autoosta',
      lamps: 5,
      profile: 'Default'
  },
  {
    id: 4,
    name: 'Group 3',
    lamps: 18,
    profile: 'Default'
  },
  {
    id: 5,
    name: 'Lokomotīve',
    lamps: 25,
    profile: 'Default'
  },
  {
    id:  6,
    name: 'Dzelzceļnieks',
    lamps: 67,
    profile: 'Default'
  },
  {
    id: 7,
    name: 'Cietoksnis',
    lamps: 12,
    profile: 'Default'
  },
  {
    id: 8,
    name: 'Autoosta',
    lamps: 5,
    profile: 'Default'
  },
  {
    id: 9,
    name: 'Group 3',
    lamps: 18,
    profile: 'Default'
  },
  {
    id: 10,
    name: 'Lokomotīve',
    lamps: 25,
    profile: 'Default'
  }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
