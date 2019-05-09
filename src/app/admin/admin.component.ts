import { Component, OnInit } from '@angular/core';
import { Doctor } from '@app/_models/doctor.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from '@app/_services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/_services';

import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from '@app/_services/employee.service';
import { Employee } from '@app/_models/employee.model';
import { Users } from '@app/_models/users.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  employee: Employee = null;
  currentUser : Users
  constructor(
    private formBuilder: FormBuilder,
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,
    private userService: AuthenticationService
  ) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user })
  }

  ngOnInit() {
    this.spinner.show()
    this.service.getObjectByID(this.currentUser.usable_id).subscribe(
      data => {
        this.spinner.hide()
        this.employee = data["data"] as Employee;
      }
    )
  }

}
