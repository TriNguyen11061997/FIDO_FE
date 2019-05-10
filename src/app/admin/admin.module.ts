import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { AdminDoctorComponent } from './admin-doctor/admin-doctor.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AuthGuard } from '@app/_guards';
import { AdminPatientComponent } from './admin-patient/admin-patient.component';
import { AdminDoctorFormComponent } from './admin-doctor/admin-doctor-form/admin-doctor-form.component';
import { AdmminPatientFormComponent } from './admin-patient/admmin-patient-form/admmin-patient-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminEmployeeComponent } from './admin-employee/admin-employee.component';
import { AdminEmployeeFormComponent } from './admin-employee/admin-employee-form/admin-employee-form.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminDoctorCetificateComponent } from './admin-doctor/admin-doctor-cetificate/admin-doctor-cetificate.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { AdminResetpassComponent } from './admin-resetpass/admin-resetpass.component';



const appRoutes: Routes = [
  { path: 'admin/doctor', component: AdminDoctorComponent, canActivate: [AuthGuard] },
  { path: 'admin/patient', component: AdminPatientComponent, canActivate: [AuthGuard] },
  { path: 'admin/doctor/form/:id', component: AdminDoctorFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/doctor/form', component: AdminDoctorFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/patient/form', component: AdmminPatientFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/patient/form/:id', component: AdmminPatientFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/employee', component: AdminEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'admin/employee/form', component: AdminEmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/employee/form/:id', component: AdminEmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/report', component: AdminReportComponent, canActivate: [AuthGuard] },
  { path: 'admin/doctor/certificate/:id', component: AdminDoctorCetificateComponent, canActivate: [AuthGuard] },
  { path: 'admin/account', component: AdminAccountComponent,canActivate: [AuthGuard] },
  { path: 'admin/info/edit', component: AdminInfoComponent,canActivate: [AuthGuard] },
  { path: 'admin/resetpass', component: AdminResetpassComponent,canActivate: [AuthGuard] },
  // otherwise redirect to home
];
@NgModule({
  declarations: [
    AdminDoctorComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminPatientComponent,
    AdminDoctorFormComponent,
    AdmminPatientFormComponent,
    AdminEmployeeComponent,
    AdminEmployeeFormComponent,
    AdminReportComponent,
    AdminDoctorCetificateComponent,
    AdminAccountComponent,
    AdminInfoComponent,
    AdminResetpassComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    AdminHeaderComponent,
    AdminFooterComponent,
  ]
})
export class AdminModule { }
