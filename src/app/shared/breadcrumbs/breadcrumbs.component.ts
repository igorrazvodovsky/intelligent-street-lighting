import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '~local/services/device.service'
import { Observable } from 'rxjs';
import { Device, DeviceGroup, Profile } from '~local/types'

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {
  @Input() groupId: number;
  @Input() deviceId: number;

  deviceSiblings$: Observable<Device[]>;
  devices: { name: string, id: number }[];
  currentDevice: { name: string, id: number };

  list = [
    {
      title: "Section 1",
      children: []
    },
    {
      title: "Section 2",
      children: [
        {
          title: "Section 2.1",
          children: []
        },
        {
          title: "Section 2.2",
          children: []
        },
        {
          title: "Section 2.3",
          children: []
        }
      ]
    },
    {
      title: "Section 3",
      children: [
        { title: "Section 3.1", children: [] },
        {
          title: "Section 3.2",
          children: [
            {
              title: "Section 3.2.1",
              children: []
            },
            {
              title: "Section 3.2.2",
              children: []
            },
            {
              title: "Section 3.2.3",
              children: [
                {
                  title: "Section 3.2.3.1",
                  children: []
                },
                {
                  title: "Section 3.2.3.2",
                  children: []
                }
              ]
            }
          ]
        },
        {
          title: "Section 3.3",
          children: [
            {
              title: "Section 3.3.1",
              children: []
            },
            {
              title: "Section 3.3.2",
              children: []
            }
          ]
        }
      ]
    }
  ];

  selectedBranch = [
    {
      id: 2,
      name: "Group B",
    },
    {
      id: 4,
      name: "Group B1",
    },
  ];

  tree = [
    [
      {
        id: 1,
        name: 'Group A',
      },
      {
        id: 2,
        name: 'Group B',
      },
      {
        id: 3,
        name: 'Group C',
      },
    ],
    [
      {
        id: 4,
        name: 'Child group B1',
      },
      {
        id: 5,
        name: 'Child group B2',
      },
      {
        id: 6,
        name: 'Child group B3',
      },
    ]
  ]

  constructor(
    private service: DeviceService
  ) { }

  ngOnInit(): void {
    this.deviceSiblings$ = this.service.getDevicesByGroup(this.groupId);

    this.deviceSiblings$.subscribe(devices => {
      this.devices = devices.map(device => ({ name: device.name, id: device.id }));
      this.currentDevice = this.devices.find(device => device.id == this.deviceId)
    });
  }



}
