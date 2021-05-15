import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './manage-crises/devices';
import { ProfilesComponent } from './profiles/profiles.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const managementRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'devices', component: DevicesComponent },
          { path: 'profiles', component: ProfilesComponent },
          { path: 'user-profile', component: UserProfileComponent },
          { path: '', component: DashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(managementRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManagementRoutingModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
