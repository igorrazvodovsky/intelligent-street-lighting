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
    ListSummaryPipe
  ]
})
export class ManagementModule { }
