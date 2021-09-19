import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '~local/shared/shared.module';
import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { MapComponent } from './map/map.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupListItemComponent } from './group-list/group-list-item/group-list-item.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { DeviceFiltersComponent } from './device-filters/device-filters.component';
import { DeviceScComponent } from './device-detail/device-sc/device-sc.component';
import { DeviceAlertsComponent } from './device-detail/device-alerts/device-alerts.component';
import { DeviceTasksComponent } from './device-detail/device-tasks/device-tasks.component';
import { MapLegendComponent } from './map/map-legend/map-legend.component';
import { MapLayerMenuComponent } from './map/map-layer-menu/map-layer-menu.component';
import { ScConnectedDevicesComponent } from './device-detail/device-sc/sc-connected-devices/sc-connected-devices.component';
import { DeviceMetricsChartComponent } from './device-detail/device-metrics/device-metrics-chart/device-metrics-chart.component';
import { DeviceListEditActionsComponent } from './device-list/device-list-edit-actions/device-list-edit-actions.component';
import { DeviceCategoriesComponent } from './device-detail/device-categories/device-categories.component';
import { DeviceSensorEnvComponent } from './device-detail/device-sensor/device-sensor-env/device-sensor-env.component';
import { DeviceSensorTrafficComponent } from './device-detail/device-sensor/device-sensor-traffic/device-sensor-traffic.component';

@NgModule({
  declarations: [
    DevicesComponent,
    DeviceListComponent,
    DeviceDetailComponent,
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
    DeviceTasksComponent,
    MapLegendComponent,
    MapLayerMenuComponent,
    ScConnectedDevicesComponent,
    DeviceMetricsChartComponent,
    DeviceListEditActionsComponent,
    DeviceCategoriesComponent,
    DeviceSensorEnvComponent,
    DeviceSensorTrafficComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DevicesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MarkerService,
    PopupService,
    ShapeService
  ]
})
export class DevicesModule { }
