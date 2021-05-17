import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component'
import { UsersComponent } from './users/users.component'
import { GroupsComponent } from './groups/groups.component'
import { OrgsComponent } from './orgs/orgs.component'
import { AdminAuthGuard } from './auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AdminAuthGuard],
        children: [
          { path: 'users', component: UsersComponent },
          { path: 'groups', component: GroupsComponent },
          { path: 'orgs', component: OrgsComponent },
          { path: '',   redirectTo: 'users', pathMatch: 'full'},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
