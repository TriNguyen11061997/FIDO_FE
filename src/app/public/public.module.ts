import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { Routes, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PublicHeaderComponent } from './public-header/public-header.component';
import { PublicFooterComponent } from './public-footer/public-footer.component';
import { PublicComponent } from './public.component';
import { PublicDoctorComponent } from './public-doctor/public-doctor.component';
import { AuthGuard } from '@app/_guards';
import { LoginComponent } from './login';
import { PublicDoctorDetailComponent } from './public-doctor-detail/public-doctor-detail.component';
import { PublicForumComponent } from './public-forum/public-forum.component';
import { RegisterComponent } from './register/register.component';
import { DemoComponent } from './demo/demo.component';


const appRoutes: Routes = [
  { path: 'public/doctor', component: PublicDoctorComponent },
  { path: 'public/forum', component: PublicForumComponent },
  { path: 'public/doctor/details', component: PublicDoctorDetailComponent }
];
@NgModule({
  declarations: [
    PublicHeaderComponent,
    PublicFooterComponent,
    LoginComponent,
    PublicDoctorComponent,
    PublicDoctorDetailComponent,
    PublicForumComponent,
    RegisterComponent,
    DemoComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule ,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(appRoutes)
  ],
  exports:[
    PublicHeaderComponent,
    PublicFooterComponent
  ]
})
export class PublicModule { }
