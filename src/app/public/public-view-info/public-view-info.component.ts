import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from '@app/_services/patient.service';
import { AuthenticationService, UserService } from '@app/_services';
import { Patient } from '@app/_models/patient.model';
import { Router } from '@angular/router';
import { Rating } from '@app/_models/rating.model';
import { Aq } from '@app/_models/aq.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '@app/_helpers/must-match.validator';
import { Users } from '@app/_models/users.model';

@Component({
  selector: 'app-public-view-info',
  templateUrl: './public-view-info.component.html',
  styleUrls: ['./public-view-info.component.css']
})
export class PublicViewInfoComponent implements OnInit {
  patient: Patient;
  ratings: Rating[];
  currentUser : Users;
  aqs: Aq[];
  id: number;
  checkinfo: boolean = true;
  checkrating: boolean = false;
  checkaq: boolean = false;
  checkReset: boolean = false;
  formReset: FormGroup;
  submitted = false;
  constructor(
    private spinner: NgxSpinnerService,
    private patientService: PatientService,
    private userService: AuthenticationService,
    private router: Router,
    private resetService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user })
  }

  ngOnInit() {
    this.spinner.show()
    this.patientService.getObjectByID(this.currentUser.usable_id).subscribe(
      data => {
        this.spinner.hide()
        this.patient = data["data"] as Patient
        this.ratings = data["data"]["review"] as Rating[];
        this.aqs = data["data"]["questions"] as Aq[];
      }
    )
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
          this.toastr.success("Đổi mật khẩu thành công", "FIDO!");
          this.logout();
          this.router.navigate(['/login'])
        }
        else {
          this.toastr.warning("Email or Password không chính xác", "FIDO!");
        }
      }, (err) => { this.toastr.error("Email or Password không chính xác", "FIDO!"); }
    )
  }

  loadReset() {
    $("#aq").removeClass("active");
    $("#rating").removeClass("active");
    $("#info").removeClass("active");
    $("#reset").addClass("active");
    this.checkinfo = false;
    this.checkReset = true;
    this.checkaq = false;
    this.checkrating = false;
  }

  loadInfo() {
    $("#aq").removeClass("active");
    $("#rating").removeClass("active");
    $("#reset").removeClass("active");
    $("#info").addClass("active");
    this.checkinfo = true;
    this.checkaq = false;
    this.checkrating = false;
    this.checkReset = false;
  }

  loadAq() {
    $("#info").removeClass("active");
    $("#rating").removeClass("active");
    $("#aq").addClass("active");
    $("#reset").removeClass("active");
    this.checkaq = true;
    this.checkinfo = false;
    this.checkrating = false;
    this.checkReset = false;
  }

  loadRaing() {
    $("#info").removeClass("active");
    $("#aq").removeClass("active");
    $("#rating").addClass("active");
    $("#reset").removeClass("active");
    this.checkaq = false;
    this.checkinfo = false;
    this.checkrating = true;
    this.checkReset = false;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/public']);
  }


}
