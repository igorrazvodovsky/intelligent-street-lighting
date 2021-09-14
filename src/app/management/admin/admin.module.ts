import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { OrgsComponent } from './orgs/orgs.component';
import { SharedModule } from '~local/shared/shared.module';
import { DeviceModelsComponent } from './device-models/device-models.component';
import { InviteDialogComponent } from './users/invite-dialog/invite-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    GroupsComponent,
    OrgsComponent,
    DeviceModelsComponent,
    InviteDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
