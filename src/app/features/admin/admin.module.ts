import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: AdminComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
