import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '~local/shared/shared.module';
import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './device-detail/chart/chart.component'
import { ChartModule } from 'angular-highcharts';
import { MarkerService } from '~local/services/marker.service';
import { PopupService } from '~local/services/popup.service';
import { ShapeService } from '~local/services/shape.service';
import { DevicesRoutingModule } from './devices-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { DeviceLampComponent } from './device-detail/device-lamp/device-lamp.component';
import { DeviceMotionSensorComponent } from './device-detail/device-motion-sensor/device-motion-sensor.component';
import { DeviceMetricsComponent } from './device-detail/device-metrics/device-metrics.component';
import { DeviceInfoComponent } from './device-detail/device-info/device-info.component';
import { DeviceHistoryComponent } from './device-detail/device-history/device-history.component';
import { DeviceFriendsListComponent } from './device-detail/device-motion-sensor/device-friends-list/device-friends-list.component';
import { FormsModule } from '@angular/forms';
import { GroupListItemComponent } from './group-list/group-list-item/group-list-item.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { DeviceFiltersComponent } from './device-filters/device-filters.component';
import { DeviceScComponent } from './device-detail/device-sc/device-sc.component';
import { DeviceAlertsComponent } from './device-detail/device-alerts/device-alerts.component';
import { DeviceTasksComponent } from './device-detail/device-tasks/device-tasks.component';

@NgModule({
  declarations: [
    DevicesComponent,
    DeviceListComponent,
    DeviceDetailComponent,
    ChartComponent,
    MapComponent,
    GroupListComponent,
    DeviceLampComponent,
    DeviceMotionSensorComponent,
    DeviceMetricsComponent,
    DeviceInfoComponent,
    DeviceHistoryComponent,
    DeviceFriendsListComponent,
    GroupListItemComponent,
    GroupDialogComponent,
    DeviceFiltersComponent,
    DeviceScComponent,
    DeviceAlertsComponent,
    DeviceTasksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DevicesRoutingModule,
    ChartModule,
    FormsModule
  ],
  providers: [
    MarkerService,
    PopupService,
    ShapeService
  ]
})
export class DevicesModule { }
