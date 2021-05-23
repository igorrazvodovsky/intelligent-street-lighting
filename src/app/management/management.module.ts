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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ListComponent } from './devices/list/list.component';
import { TaskDialogComponent } from './dashboard/tasks/task-dialog/task-dialog.component';
import { PopupService } from '../services/popup.service';

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    AdminModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
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
    TaskDialogComponent
  ],
  providers: [
    MarkerService,
    PopupService
  ]
})
export class ManagementModule {}
