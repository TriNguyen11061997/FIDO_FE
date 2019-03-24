import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [

];
@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class PublicModule { }
