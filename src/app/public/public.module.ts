import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { PublicFooterComponent } from './public-footer/public-footer.component';
import { PublicComponent } from './public.component';
import { PublicDoctorComponent } from './public-doctor/public-doctor.component';
import { AuthGuard } from '@app/_guards';
import { LoginComponent } from './login';
import { PublicDoctorDetailComponent } from './public-doctor-detail/public-doctor-detail.component';


const appRoutes: Routes = [
  { path: 'public/doctor', component: PublicDoctorComponent },
  { path: 'public/doctor/details', component: PublicDoctorDetailComponent }
];
@NgModule({
  declarations: [
    PublicHeaderComponent,
    PublicFooterComponent,
    LoginComponent,
    PublicDoctorComponent,
    PublicDoctorDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes)
  ],
  exports:[
    PublicHeaderComponent,
    PublicFooterComponent
  ]
})
export class PublicModule { }
