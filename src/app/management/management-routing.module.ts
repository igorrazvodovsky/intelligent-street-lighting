import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminAuthGuard } from './admin/auth.guard';

const managementRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: 'admin',
            loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
            // canLoad: [AdminAuthGuard]
          },
          { path: 'devices',
            loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule),
          },
          {
            path: 'profiles',
            loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule)
          },
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
