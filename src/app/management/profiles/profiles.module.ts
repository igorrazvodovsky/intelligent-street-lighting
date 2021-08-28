import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '~local/shared/shared.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileScheduleComponent } from './profile-detail/profile-schedule/profile-schedule.component';
import { ProfileDeviceListComponent } from './profile-detail/profile-device-list/profile-device-list.component';
import { ConversationalTimeGroupPipe } from '~local/pipes/conversational-time-group.pipe';
import { FormsModule } from '@angular/forms';
import { ProfileVisualisationComponent } from './profile-detail/profile-visualisation/profile-visualisation.component';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfileDetailComponent,
    ProfileListComponent,
    ProfileScheduleComponent,
    ProfileDeviceListComponent,
    ConversationalTimeGroupPipe,
    ProfileVisualisationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfilesRoutingModule,
    FormsModule
  ]
})
export class ProfilesModule { }
