import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '@app/_helpers/must-match.validator';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserForm: FormGroup;
  registerDoctorForm: FormGroup;
  submitted = false;
  submitted1 = false;
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    this.registerDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      noilamviec: ['Nơi làm việc'],
      chuyenkhoa: ['Chuyên khoa']
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }
  get f() { return this.registerUserForm.controls; }
  get f1() { return this.registerDoctorForm.controls; }
  onSubmitUser() {
    this.submitted = true;
    //this.toastr.success("Đăng ký thành công!","FiDo!",{timeOut:1000})
    if (this.registerUserForm.invalid) {
      return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerUserForm.value))
  }
  onSubmitDoctor() {
    this.submitted1 = true;
    if (this.registerDoctorForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerDoctorForm.value))
  }
}
