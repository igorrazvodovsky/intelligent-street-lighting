import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevicesComponent } from './devices.component'
import { DeviceListComponent } from './device-list/device-list.component'
import { GroupListComponent } from './group-list/group-list.component'
import { DeviceDetailComponent } from './device-details/device-detail.component'

const devicesRoutes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    children: [
      {
        path: '',
        children: [
          { path: ':id/:id', component: DeviceDetailComponent, data: { animation: 'device' } },
          { path: ':id', component: DeviceListComponent, data: { animation: 'device' } },
          { path: '',
            component: GroupListComponent,
            data: { animation: 'devices' },
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(devicesRoutes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
