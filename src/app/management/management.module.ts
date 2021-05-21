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
@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    AdminModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    NavigationComponent,
    DashboardComponent,
    DevicesComponent,
    ProfilesComponent,
    UserProfileComponent,
    MapComponent,
    TasksComponent,
    ActivityComponent
  ],
  providers: [
    MarkerService
  ]
})
export class ManagementModule {}
