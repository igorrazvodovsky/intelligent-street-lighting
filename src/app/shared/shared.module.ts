import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageActionsComponent } from './page-actions/page-actions.component'
import { MaterialModule } from '../material-module';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@NgModule({
  declarations: [PageActionsComponent, TaskCardComponent, TaskDialogComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [PageActionsComponent, TaskCardComponent, MaterialModule]
})
export class SharedModule { }
