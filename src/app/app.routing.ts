import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards';
import { AdminComponent } from './admin/admin.component';
import { PublicComponent } from './public/public.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './public/login';
import { RegisterComponent } from './public/register/register.component';
import { DoctorModule } from './doctor/doctor.module';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  { path: '', component: PublicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'public', component: PublicComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AdminComponent,
    DoctorComponent,
    PublicComponent,
  ],
  imports: [
    AdminModule,
    PublicModule,
    CommonModule,
    DoctorModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRouting { }
