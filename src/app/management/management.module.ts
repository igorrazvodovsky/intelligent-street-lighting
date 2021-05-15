import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { ManagementRoutingModule } from './management-routing.module';
import { MaterialModule } from '../material-module';

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MaterialModule
  ],
  declarations: [
    NavigationComponent,
    DashboardComponent,
    ManageCrisesComponent,
    ManageHeroesComponent
  ]
})
export class ManagementModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
