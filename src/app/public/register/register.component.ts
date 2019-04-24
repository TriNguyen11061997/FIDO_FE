import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '@app/_helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@app/_services';
import { timeout } from 'rxjs/operators';

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
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService) { }

  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: [''],
      usable_type: ['App\\Patient']
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

    this.userService.register(this.registerUserForm.value).subscribe(
      data => {
        this.toastr.success("Đăng kí thành công!", "FIDO!",{ timeOut: 2000 })
      }, (err) => { this.toastr.error("Đăng kí không thành công!", "FIDO!",{ timeOut: 2000 }) }
    )

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
