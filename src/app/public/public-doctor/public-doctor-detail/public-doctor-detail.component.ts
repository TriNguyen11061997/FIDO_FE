import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Doctor } from '@app/_models/doctor.model';

import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';

import { Users } from '@app/_models/users.model';
import { ToastrService } from 'ngx-toastr';
import { Rating } from '@app/_models/rating.model';
import { RatingService } from '@app/_services/rating.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Aq } from '@app/_models/aq.model';
import { AqService } from '@app/_services/aq.service';

@Component({
  selector: 'app-public-doctor-detail',
  templateUrl: './public-doctor-detail.component.html',
  styleUrls: ['./public-doctor-detail.component.css']
})
export class PublicDoctorDetailComponent implements OnInit {
  currentUser: Users;
  loadReview: boolean = false;
  doctor: Doctor = null;
  ratingForm: FormGroup;
  aqForm: FormGroup;
  rate: number;
  ratings: Rating[];
  id: number;
  rating: Rating;
  aqs: Aq[];
  loadDetail: boolean = true;
  loadRating: boolean = false;
  loadAQ: boolean = false;
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authorService: AuthenticationService,
    private ratingService: RatingService,
    private toastr: ToastrService,
    private aqService: AqService,
    private spinner: NgxSpinnerService
  ) {
    this.authorService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    if (this.currentUser != null) {
      this.loadReview = true;
    }
    this.id = this.route.snapshot.params['id'];
    this.spinner.show(),
      this.doctorService.getObjectByID(this.route.snapshot.params['id']).subscribe(
        data => {
          this.spinner.hide()
          this.doctor = data as Doctor;
          this.id = this.doctor.id;
          this.rate = Math.round(this.doctor.rating);
          if (data["review"] != null) {
            this.ratings = data["review"];
          }
        },
        (err) => {
        }
      )
    this.aqService.getObjectByDoctorID(this.id).subscribe(
      data => {
        this.aqs = data as Aq[]
      }
    )
    this.ratingForm = this.formBuilder.group({
      doctor_id: [null],
      review: [null, Validators],
      star: [null]
    })
    this.aqForm = this.formBuilder.group({
      question_content: [null, Validators],
    })
  }

  onAq() {
    let aq = new Aq();
    aq = this.aqForm.value;
    aq.doctor_id = this.id;
    aq.patient_id = this.currentUser.usable_id;
    this.spinner.show()
    this.aqService.add(aq).subscribe(
      data => {
        this.spinner.hide();
        this.toastr.show("Cám ơn bạn đã gửi nhận xét!");
        this.aqService.getObjectByDoctorID(this.id).subscribe(
          aq => {
            this.aqs = aq as Aq[]
          }
        )
        this.resetAq();
      }, (err) => { this.toastr.error(err) }
    )
  }

  getDoctorDetails(id: number) {
    this.doctorService.getObjectByID(id).subscribe(
      data => {
        this.doctor = data as Doctor;
        this.id = this.doctor.id;
        this.rate = Math.round(this.doctor.rating);
        if (data["review"] != null) {
          this.ratings = data["review"];
        }
      },
      (err) => {
      }
    )
  }
  ShowDetail() {
    this.loadDetail = true;
    this.loadRating = false;
    this.loadAQ = false;
  }

  ShowRating() {
    this.loadDetail = false;
    this.loadRating = true;
    this.loadAQ = false;
  }
  ShowAQ() {
    this.loadDetail = false;
    this.loadRating = false;
    this.loadAQ = true;
  }
  onSubmit() {
    this.rating = this.ratingForm.value;
    this.rating.patient_id = this.currentUser.usable_id;
    this.rating.doctor_id = this.id;
    this.spinner.show()
    this.ratingService.add(this.rating).subscribe(
      data => {
        this.spinner.hide();
        this.toastr.show("Cảm ơn bạn đã gửi câu hỏi!");
        this.ratingService.getObjectByDoctorID(this.id).subscribe(
          rates => {
            this.ratings = rates as Rating[]
          }
        )
        this.resetRating();
      }, (err) => { this.toastr.error(err) }
    )
  }

  resetRating() {
    this.ratingForm.patchValue({
      review: null,
      star: null,
    })
  }

  resetAq() {
    this.aqForm.patchValue({
      question_content: null
    })
  }

}
