import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AdminComponent } from './admin/admin.component';
import { PublicComponent } from './public/public.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'public', component: PublicComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AdminComponent,
    DoctorComponent
  ],
  imports: [
    PublicModule,
    AdminModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRouting { }
