import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ManagementRoutingModule } from './management-routing.module';
import { MaterialModule } from '../material-module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { PageActionsComponent } from './page-actions/page-actions.component';

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MaterialModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavigationComponent,
    DashboardComponent,
    DevicesComponent,
    ProfilesComponent,
    UserProfileComponent,
    PageActionsComponent
  ]
})
export class ManagementModule {}
