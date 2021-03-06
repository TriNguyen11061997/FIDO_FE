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
import { AuthBSGuard } from '@app/_guards';
import { DoctorAqComponent } from './doctor-aq/doctor-aq.component';
import { DoctorAqFormComponent } from './doctor-aq/doctor-aq-form/doctor-aq-form.component';
import { DoctorInfoComponent } from './doctor-info/doctor-info.component';
import { DoctorResetpassComponent } from './doctor-resetpass/doctor-resetpass.component';

const appRoutes: Routes = [
   //{ path: 'admin/doctor', component: , canActivate: [AuthGuard] },
   { path: 'doctor/certificates', component: DoctorCertificateComponent,canActivate: [AuthBSGuard] },
   { path: 'doctor/comment', component: DoctorCommentComponent, canActivate: [AuthBSGuard] },
   { path: 'doctor/aq', component: DoctorAqComponent, canActivate: [AuthBSGuard] },
   { path: 'doctor/aq/form/:id', component: DoctorAqFormComponent, canActivate: [AuthBSGuard] },
   { path: 'doctor/info/edit', component: DoctorInfoComponent, canActivate: [AuthBSGuard] },
   { path: 'doctor/resetpass', component: DoctorResetpassComponent, canActivate: [AuthBSGuard] },
   // otherwise redirect to home
];
@NgModule({
  declarations: [
    DoctorHeaderComponent,
    DoctorFooterComponent,
    DoctorCertificateComponent,
    DoctorCommentComponent,
    DoctorCertificateListComponent,
    DoctorCertificateFormComponent,
    DoctorAqComponent,
    DoctorAqFormComponent,
    DoctorInfoComponent,
    DoctorResetpassComponent
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
