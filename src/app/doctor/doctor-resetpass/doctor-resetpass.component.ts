import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService, UserService } from '@app/_services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '@app/_helpers/must-match.validator';
import { Users } from '@app/_models/users.model';

@Component({
  selector: 'app-doctor-resetpass',
  templateUrl: './doctor-resetpass.component.html',
  styleUrls: ['./doctor-resetpass.component.css']
})
export class DoctorResetpassComponent implements OnInit {
  formReset: FormGroup;
  submitted = false;
  currentUser: Users;
  constructor(
    private spinner: NgxSpinnerService,
    private userService: AuthenticationService,
    private router: Router,
    private resetService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user })
  }

  ngOnInit() {
    this.formReset = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      resetPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      _method: ['PUT']
    },
      {
        validator: MustMatch('resetPassword', 'confirmPassword')
      });
    this.formReset.patchValue({
      email: this.currentUser.email
    })
  }
  get f() { return this.formReset.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.formReset.invalid) {
      return;
    }
    this.resetService.resetPass(this.formReset.value).subscribe(
      data => {
        if (data["status_code"] == 200) {
          this.toastr.success("Đổi mật khẩu thành công thành công", "FIDO!");
          this.userService.logout();
          this.router.navigate(['/login'])
        }
        else {
          this.toastr.warning("Email or Password không chính xác", "FIDO!");
        }
      }, (err) => { this.toastr.error(err, "FIDO!"); }
    )
  }


}
