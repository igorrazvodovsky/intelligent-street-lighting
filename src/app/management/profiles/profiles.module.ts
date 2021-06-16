import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileListComponent } from './profile-list/profile-list.component';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfileDetailComponent,
    ProfileListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfilesRoutingModule,
  ]
})
export class ProfilesModule { }
