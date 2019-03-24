import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { DoctorsComponent } from './doctors/doctors.component';

@NgModule({
  declarations: [DoctorsComponent],
  imports: [
    CommonModule
  ],

})
export class AdminModule { }
