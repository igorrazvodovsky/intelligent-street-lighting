import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementRoutingModule } from './management-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { TasksComponent } from './dashboard/tasks/tasks.component';
import { ActivityComponent } from './dashboard/activity/activity.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PermissionsComponent } from './user-profile/permissions/permissions.component';
import { DevicesModule } from './devices/devices.module';
import { AreasComponent } from './dashboard/areas/areas.component';
import { AreaChartComponent } from './dashboard/areas/area-chart/area-chart.component';
import { DateFnsModule } from 'ngx-date-fns';
import { ListSummaryPipe } from '~local/pipes/list-summary.pipe';
import { DeviceEventComponent } from './dashboard/activity/device-event/device-event.component';
import { UserEventComponent } from './dashboard/activity/user-event/user-event.component';
import { ReportsComponent } from './reports/reports.component';
import { InitialisationComponent } from './initialisation/initialisation.component';
import { InitialisationLampComponent } from './initialisation/initialisation-lamp/initialisation-lamp.component';
import { InitialisationScComponent } from './initialisation/initialisation-sc/initialisation-sc.component';
import { ScannerDialogComponent } from './initialisation/scanner-dialog/scanner-dialog.component';
import { InitialisationLocationComponent } from './initialisation/initialisation-location/initialisation-location.component';
import { NotificationsComponent } from './navigation/notifications/notifications.component';
import { UserProfileMenuComponent } from './navigation/user-profile-menu/user-profile-menu.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    AdminModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
    DevicesModule,
    DateFnsModule.forRoot()
  ],
  declarations: [
    NavigationComponent,
    DashboardComponent,
    UserProfileComponent,
    TasksComponent,
    ActivityComponent,
    PermissionsComponent,
    AreasComponent,
    AreaChartComponent,
    ListSummaryPipe,
    DeviceEventComponent,
    UserEventComponent,
    ReportsComponent,
    InitialisationComponent,
    InitialisationLampComponent,
    InitialisationScComponent,
    ScannerDialogComponent,
    InitialisationLocationComponent,
    NotificationsComponent,
    UserProfileMenuComponent,
    ToolbarComponent
  ]
})
export class ManagementModule { }
