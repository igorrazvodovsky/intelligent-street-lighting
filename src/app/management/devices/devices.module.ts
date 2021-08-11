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
import { DeviceOverviewComponent } from './device-detail/device-overview/device-overview.component';
import { DeviceMotionSensorComponent } from './device-detail/device-motion-sensor/device-motion-sensor.component';
import { DeviceMetricsComponent } from './device-detail/device-metrics/device-metrics.component';
import { DeviceInfoComponent } from './device-detail/device-info/device-info.component';
import { DeviceHistoryComponent } from './device-detail/device-history/device-history.component';
import { DeviceFriendsListComponent } from './device-detail/device-motion-sensor/device-friends-list/device-friends-list.component';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

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
    DeviceHistoryComponent,
    DeviceFriendsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DevicesRoutingModule,
    ChartModule,
    FormsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiaWdvcnJhenZvZG92c2t5IiwiYSI6ImNrczV3dHI3ODA1YTQycnF5bnV4N2xjcm0ifQ.1b4VIA7aqOZc_oiiTyNl-w'
    })
  ],
  providers: [
    MarkerService,
    PopupService,
    ShapeService
  ]
})
export class DevicesModule { }
