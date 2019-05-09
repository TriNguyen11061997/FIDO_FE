import { Component, OnInit } from '@angular/core';
import { Doctor } from '@app/_models/doctor.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from '@app/_services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/_services';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctor: Doctor = null;
  id : number
  constructor(
    private formBuilder: FormBuilder,
    private service: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,
    private userService: AuthenticationService
  ) {
    this.userService.currentUser.subscribe(user => { this.id = user.usable_id })
  }

  ngOnInit() {
    this.spinner.show()
    this.service.getObjectByID(this.id).subscribe(
      data => {
        this.spinner.hide()
        this.doctor = data as Doctor;
      }
    )
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/public']);
  }
}
