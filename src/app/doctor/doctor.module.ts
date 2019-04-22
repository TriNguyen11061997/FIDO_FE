import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorFooterComponent } from './doctor-footer/doctor-footer.component';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_guards';

const appRoutes: Routes = [
  // { path: 'admin/doctor', component: , canActivate: [AuthGuard] },
  // { path: 'admin/patient', component: , canActivate: [AuthGuard] },
  // otherwise redirect to home
];
@NgModule({
  declarations: [
    DoctorHeaderComponent,
    DoctorFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)  
  ],
  exports: [
    DoctorHeaderComponent,
    DoctorFooterComponent
  ]
})
export class DoctorModule { }
