import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedtaskComponent } from './completedtask/completedtask.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    CompletedtaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [CompletedtaskComponent]
})
export class TaskModule { }
export interface entry {
  id: number
  task: string
}