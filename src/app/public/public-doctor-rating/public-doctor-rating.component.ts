import { Component, OnInit } from '@angular/core';
import { Doctor } from '@app/_models/doctor.model';
import { DoctorService } from '@app/_services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-doctor-rating',
  templateUrl: './public-doctor-rating.component.html',
  styleUrls: ['./public-doctor-rating.component.css']
})
export class PublicDoctorRatingComponent implements OnInit {
  doctor: Doctor;
  rate: number;
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getDoctorDetails(this.route.snapshot.params['id']);
  }
  getDoctorDetails(id: number) {
    this.doctorService.getObjectByID(id).subscribe(
      data => {
        this.doctor = data["data"];
        this.rate = 2.5;
      },
      (err) => {

      }
    )
  }

}
