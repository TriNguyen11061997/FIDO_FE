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
import { AuthGuard, AuthBNGuard } from '@app/_guards';
import { LoginComponent } from './login';
import { PublicDoctorDetailComponent } from './public-doctor/public-doctor-detail/public-doctor-detail.component';
import { PublicForumComponent } from './public-forum/public-forum.component';
import { RegisterComponent } from './register/register.component';
import { DoctorComponent } from '@app/doctor/doctor.component';
import { BarRatingModule } from "ngx-bar-rating";
import { PublicInfoComponent } from './public-info/public-info.component';
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PublicViewInfoComponent } from './public-view-info/public-view-info.component';
import { PublicSickComponent } from './public-sick/public-sick.component';
const appRoutes: Routes = [
  { path: 'public/doctor', component: PublicDoctorComponent },
  { path: 'public/forum', component: PublicForumComponent },
  { path: 'public/doctor/details/:id', component: PublicDoctorDetailComponent },
  { path: 'public/doctor/:address_id/:name', component: PublicDoctorComponent },
  { path: 'public/info/edit', component: PublicInfoComponent, canActivate: [AuthBNGuard] },
  { path: 'public/info', component: PublicViewInfoComponent, canActivate: [AuthBNGuard] },
  { path: 'public/sick', component: PublicSickComponent, canActivate: [AuthBNGuard] },
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
    PublicInfoComponent,
    PublicViewInfoComponent,
    PublicSickComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    BarRatingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    RouterModule.forChild(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHNHoCKHcwaqSnYsfnVVeqx_-nPptJP0k',
      libraries: ['places']
    })
  ],
  exports: [
    PublicHeaderComponent,
    PublicFooterComponent
  ]
})
export class PublicModule { }
