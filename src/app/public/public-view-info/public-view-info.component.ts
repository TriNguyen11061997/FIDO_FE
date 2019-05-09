import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from '@app/_services/patient.service';
import { AuthenticationService } from '@app/_services';
import { Patient } from '@app/_models/patient.model';
import { Router } from '@angular/router';
import { Rating } from '@app/_models/rating.model';
import { Aq } from '@app/_models/aq.model';

@Component({
  selector: 'app-public-view-info',
  templateUrl: './public-view-info.component.html',
  styleUrls: ['./public-view-info.component.css']
})
export class PublicViewInfoComponent implements OnInit {
  patient: Patient;
  rating: Rating;
  aq : Aq;
  id: number;
  loadInfo: boolean= true;
  loadRating: boolean = false;
  loadAq: boolean = false;
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
        this.rating = data["data"]["reviews"] as Rating;
        this.aq = data["data"]["questions"] as Aq;
      }
    )
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/public']);
  }

}
