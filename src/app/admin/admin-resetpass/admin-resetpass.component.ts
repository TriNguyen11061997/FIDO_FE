import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService, UserService } from '@app/_services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '@app/_helpers/must-match.validator';
import { Users } from '@app/_models/users.model';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-admin-resetpass',
  templateUrl: './admin-resetpass.component.html',
  styleUrls: ['./admin-resetpass.component.css']
})
export class AdminResetpassComponent implements OnInit {

  formReset: FormGroup;
  currentUser: Users;
  submitted = false;
  constructor(
    private spinner: NgxSpinnerService,
    private userService: AuthenticationService,
    private router: Router,
    private resetService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userService.currentUser.subscribe(user => {this.currentUser = user})
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
        email : this.currentUser.email
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
