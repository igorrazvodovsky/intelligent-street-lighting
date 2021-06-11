import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-details/device-detail.component';
import { MapComponent } from './map/map.component';

import { ChartComponent } from './device-details/chart/chart.component'
import { ChartModule } from 'angular-highcharts';

import { MarkerService } from '../../services/marker.service';
import { PopupService } from '../../services/popup.service';
import { ShapeService } from '../../services/shape.service';

import { DevicesRoutingModule } from './devices-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { DeviceOverviewComponent } from './device-details/device-overview/device-overview.component';
import { DeviceMotionSensorComponent } from './device-details/device-motion-sensor/device-motion-sensor.component';
import { DeviceMetricsComponent } from './device-details/device-metrics/device-metrics.component';
import { DeviceInfoComponent } from './device-details/device-info/device-info.component';
import { DeviceHistoryComponent } from './device-details/device-history/device-history.component';


@NgModule({
  declarations: [
    DevicesComponent,
    DeviceListComponent,
    DeviceDetailComponent,
    ChartComponent,
    MapComponent,
    GroupListComponent,
    DeviceOverviewComponent,
    DeviceMotionSensorComponent,
    DeviceMetricsComponent,
    DeviceInfoComponent,
    DeviceHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DevicesRoutingModule,
    ChartModule
  ],
  providers: [
    MarkerService,
    PopupService,
    ShapeService
  ]
})
export class DevicesModule { }
