import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorFooterComponent } from './doctor-footer/doctor-footer.component';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_guards';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DoctorCertificateComponent } from './doctor-certificate/doctor-certificate.component';
import { DoctorCommentComponent } from './doctor-comment/doctor-comment.component';
import { DoctorCertificateListComponent } from './doctor-certificate/doctor-certificate-list/doctor-certificate-list.component';
import { DoctorCertificateFormComponent } from './doctor-certificate/doctor-certificate-form/doctor-certificate-form.component';

const appRoutes: Routes = [
   //{ path: 'admin/doctor', component: , canActivate: [AuthGuard] },
   { path: 'doctor/certificates', component: DoctorCertificateComponent, canActivate: [AuthGuard] },
   { path: 'doctor/comment', component: DoctorCommentComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
];
@NgModule({
  declarations: [
    DoctorHeaderComponent,
    DoctorFooterComponent,
    DoctorCertificateComponent,
    DoctorCommentComponent,
    DoctorCertificateListComponent,
    DoctorCertificateFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild(appRoutes)  
  ],
  exports: [
    DoctorHeaderComponent,
    DoctorFooterComponent
  ]
})
export class DoctorModule { }
