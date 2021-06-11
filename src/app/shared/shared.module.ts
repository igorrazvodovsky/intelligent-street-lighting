import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageActionsComponent } from './page-actions/page-actions.component'
import { MaterialModule } from '../material-module';
import { TaskCardComponent } from './task-card/task-card.component';

@NgModule({
  declarations: [PageActionsComponent, TaskCardComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [PageActionsComponent, MaterialModule]
})
export class SharedModule { }
