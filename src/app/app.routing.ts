import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AdminComponent } from './admin/admin.component';
import { PublicComponent } from './public/public.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { PublicDoctorComponent } from './public/public-doctor/public-doctor.component';
import { PublicFooterComponent } from './public/public-footer/public-footer.component';
import { PublicHeaderComponent } from './public/public-header/public-header.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './public/login';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
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
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRouting { }
