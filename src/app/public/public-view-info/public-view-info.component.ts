import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from '@app/_services/patient.service';
import { AuthenticationService } from '@app/_services';
import { Patient } from '@app/_models/patient.model';
import { Router } from '@angular/router';
import { Rating } from '@app/_models/rating.model';
import { Aq } from '@app/_models/aq.model';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-public-view-info',
  templateUrl: './public-view-info.component.html',
  styleUrls: ['./public-view-info.component.css']
})
export class PublicViewInfoComponent implements OnInit {
  patient: Patient;
  ratings: Rating[];
  aqs: Aq[];
  id: number;
  checkinfo: boolean = true;
  checkrating: boolean = false;
  checkaq: boolean = false;
  checkReset: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private patientService: PatientService,
    private userService: AuthenticationService,
    private router: Router,
  ) {
    this.userService.currentUser.subscribe(user => { this.id = user.usable_id })
  }

  ngOnInit() {
    this.spinner.show()
    this.patientService.getObjectByID(this.id).subscribe(
      data => {
        this.spinner.hide()
        this.patient = data["data"] as Patient
        this.ratings = data["data"]["reviews"] as Rating[];
        this.aqs = data["data"]["questions"] as Aq[];
      }
    )
  }

  loadInfo() {
    $("#aq").removeClass("active");
    $("#rating").removeClass("active");
    $("#info").addClass("active");
    this.checkinfo = true;
    this.checkaq = false;
    this.checkrating = false;
  }

  loadAq() {
    $("#info").removeClass("active");
    $("#rating").removeClass("active");
    $("#aq").addClass("active");
    this.checkaq = true;
    this.checkinfo = false;
    this.checkrating = false;
  }

  loadRaing() {
    $("#info").removeClass("active");
    $("#aq").removeClass("active");
    $("#rating").addClass("active");
    this.checkaq = false;
    this.checkinfo = false;
    this.checkrating = true;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/public']);
  }

}
