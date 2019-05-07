import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, AuthBNGuard } from './_guards';
import { AdminComponent } from './admin/admin.component';
import { PublicComponent } from './public/public.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './public/login';
import { RegisterComponent } from './public/register/register.component';
import { DoctorModule } from './doctor/doctor.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthBSGuard } from './_guards/auth-bs.guard';

const appRoutes: Routes = [
  { path: '', component: PublicComponent,canActivate:[AuthBNGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'public', component: PublicComponent, canActivate:[AuthBNGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthBSGuard] },
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
    FormsModule,
    ReactiveFormsModule,
    PublicModule,
    CommonModule,
    DoctorModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRouting { }
