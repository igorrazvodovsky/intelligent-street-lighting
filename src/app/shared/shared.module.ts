import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageActionsComponent } from './page-actions/page-actions.component'
import { MaterialModule } from '../material-module';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { AutocompleteUserComponent } from './autocomplete-user/autocomplete-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { NameDialogComponent } from './name-dialog/name-dialog.component';
import { DeviceModelDialogComponent } from './device-model-dialog/device-model-dialog.component';

@NgModule({
  declarations: [PageActionsComponent, TaskCardComponent, TaskDialogComponent, AutocompleteUserComponent, BreadcrumbsComponent, NameDialogComponent, DeviceModelDialogComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  exports: [PageActionsComponent, TaskCardComponent, MaterialModule, BreadcrumbsComponent]
})
export class SharedModule { }
