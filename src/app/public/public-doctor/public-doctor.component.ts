import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { FormGroup } from '@angular/forms';
import { Specialist } from '@app/_models/specialist.model';
import { SpecialistService } from '@app/_services/specialist.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-public-doctor',
  templateUrl: './public-doctor.component.html',
  styleUrls: ['./public-doctor.component.css']
})
export class PublicDoctorComponent implements OnInit {

  public listDoctor:  Array<Doctor> = [];
  specialists: Specialist[] = [];
  doctorLenght: number;
  doctors: Doctor[];
  formData: FormGroup;
  constructor(
    private doctorService: DoctorService,
    private specialistService: SpecialistService
  ) { }

  ngOnInit() {
    this.specialistService.getAllObject().subscribe(
      data => {
        this.specialists = data 
      }
    ),
    this.getDoctor();
  } 

  getDoctor() {
    this.doctorService.get10Object(1)
      .subscribe(data => {
        this.listDoctor = data["data"] as Doctor[];
      }, (err) => { console.log(err) }
      )
  }
}
