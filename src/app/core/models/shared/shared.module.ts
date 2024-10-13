import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputErrorPipe } from './input-error.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputErrorPipe,
    RouterModule
  ],
  exports: [
    ReactiveFormsModule,
    InputErrorPipe,
    RouterModule
  ]

})
export class SharedModule { }
