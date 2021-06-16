import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilesComponent } from './profiles.component'
import { ProfileListComponent } from './profile-list/profile-list.component'
import { ProfileDetailComponent } from './profile-detail/profile-detail.component'

const profilesRoutes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    children: [
      {
        path: '',
        children: [
          { path: ':id', component: ProfileDetailComponent },
          { path: '',
            component: ProfileListComponent,
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(profilesRoutes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
