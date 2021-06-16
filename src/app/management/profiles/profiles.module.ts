import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileScheduleComponent } from './profile-detail/profile-schedule/profile-schedule.component';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfileDetailComponent,
    ProfileListComponent,
    ProfileScheduleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfilesRoutingModule,
  ]
})
export class ProfilesModule { }
