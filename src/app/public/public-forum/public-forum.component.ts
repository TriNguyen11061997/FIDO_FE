import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorService } from '@app/_services/doctor.service';
import { PatientService } from '@app/_services/patient.service';
import { Patient } from '@app/_models/patient.model';
import { UsergroupService } from '@app/_services/usergroup.service';
import { Usergroup } from '@app/_models/usergroup.model';
import { error } from 'util';
import { map } from 'rxjs/operators';
import { Doctor } from '@app/_models/doctor.model';

@Component({
  selector: 'app-public-forum',
  templateUrl: './public-forum.component.html',
  styleUrls: ['./public-forum.component.css']
})
export class PublicForumComponent implements OnInit {
  doctorForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: DoctorService,
    private service1: DoctorService) { }

  ngOnInit() {
    this.service1.getObjectByID(2)
    .subscribe(
      data => {
        this.doctorForm.patchValue({
          doctor_no: data["data"].name,
          name : data["data"].phone_no_1,
          passport_date : data["data"].id_number_date,
        })
      },(err)=>{console.log(err)}
    );
    this.doctorForm = this.formBuilder.group({
      doctor_no: [null, Validators.required],
      name: [null, Validators.required],
      avatar: [null, Validators.required],
      birthday: [null, Validators.required],
      description: [null, Validators.required],
      gender: [null, Validators.required],
      id_number: [null, Validators.required],
      id_number_place: [null, Validators.required],
      id_number_date: [null, Validators.required],
      passport_no: [null],
      passport_place: [null],
      passport_date: [null],
      phone_no_1: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      fk_employee_id: [null],
      specialist: [null, Validators.required],
      hospital_name: [null, Validators.required]
    });
    //this.doctorForm.setValue(this.service.formData);
    //console.log(this.service1.formData.name);
    //this.doctorForm.patchValue({doctor_no : this.service.formData.doctor_no});
  }
  get f() { return this.doctorForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.doctorForm.invalid) {
      return;
    }
  }
}
