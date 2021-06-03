import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ManagementRoutingModule } from './management-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { MapComponent } from './devices/map/map.component';
import { MarkerService } from '../services/marker.service';
import { TasksComponent } from './dashboard/tasks/tasks.component';
import { ActivityComponent } from './dashboard/activity/activity.component';
import { LayoutComponent } from './devices/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ListComponent } from './devices/list/list.component';
import { TaskDialogComponent } from './dashboard/tasks/task-dialog/task-dialog.component';
import { PopupService } from '../services/popup.service';
import { ShapeService } from '../services/shape.service';
import { PermissionsComponent } from './user-profile/permissions/permissions.component';
import { DeviceComponent } from './devices/device/device.component';
import { ChartComponent } from './devices/device/chart/chart.component'
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    AdminModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
    ChartModule
  ],
  declarations: [
    NavigationComponent,
    DashboardComponent,
    DevicesComponent,
    ProfilesComponent,
    UserProfileComponent,
    MapComponent,
    TasksComponent,
    ActivityComponent,
    LayoutComponent,
    ListComponent,
    TaskDialogComponent,
    PermissionsComponent,
    DeviceComponent,
    ChartComponent
  ],
  providers: [
    MarkerService,
    PopupService,
    ShapeService
  ]
})
export class ManagementModule {}
