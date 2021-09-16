import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'permissions',
  templateUrl: './permissions.component.html'
})
export class PermissionsComponent implements OnInit {
  panelOpenState = false;
  roles: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  permissions: { name: string, permissions: { name: string, enabled: boolean }[] }[] = [
    {
      name: "Devices",
      permissions: [
        {
          name: "View",
          enabled: true,
        },
        {
          name: "Edit",
          enabled: true,
        },
        {
          name: "Create",
          enabled: true,
        },
        {
          name: "Delete",
          enabled: true,
        }
      ],
    },
    {
      name: "Profiles",
      permissions: [
        {
          name: "View",
          enabled: true,
        },
        {
          name: "Edit",
          enabled: true,
        },
        {
          name: "Create",
          enabled: true,
        },
        {
          name: "Delete",
          enabled: true,
        }
      ],
    },
    {
      name: "Organisations",
      permissions: [
        {
          name: "View",
          enabled: true,
        },
        {
          name: "Edit",
          enabled: true,
        },
        {
          name: "Create",
          enabled: true,
        },
        {
          name: "Delete",
          enabled: true,
        }
      ],
    },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
