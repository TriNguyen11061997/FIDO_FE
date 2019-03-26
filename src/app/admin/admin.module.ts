import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminDoctorComponent } from './admin-doctor/admin-doctor.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AuthGuard } from '@app/_guards';
import { PatientComponent } from './patient/patient.component';



const appRoutes: Routes = [
  { path: 'admin/doctor', component: AdminDoctorComponent,canActivate: [AuthGuard] },
  { path: 'admin/patient', component: PatientComponent,canActivate: [AuthGuard] },
  // otherwise redirect to home
];
@NgModule({
  declarations: [
     AdminDoctorComponent,
     AdminHeaderComponent,
     AdminFooterComponent,
     PatientComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)  
  ],
  exports: [
    AdminHeaderComponent,
    AdminFooterComponent,
  ]
})
export class AdminModule { }
