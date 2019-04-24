import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-public-doctor',
  templateUrl: './public-doctor.component.html',
  styleUrls: ['./public-doctor.component.css']
})
export class PublicDoctorComponent implements OnInit {

  listDoctor: Doctor[] = [];
  formData: FormGroup;
  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.doctorService.getAllObject()
      .subscribe(data => {
        this.listDoctor = data["data"][0];
      }, (err) => { console.log(err) }
      )
  }
}
