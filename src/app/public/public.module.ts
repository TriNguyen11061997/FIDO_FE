import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { PublicFooterComponent } from './public-footer/public-footer.component';
import { PublicComponent } from './public.component';


const appRoutes: Routes = [

];
@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports:[
  ]
})
export class PublicModule { }
