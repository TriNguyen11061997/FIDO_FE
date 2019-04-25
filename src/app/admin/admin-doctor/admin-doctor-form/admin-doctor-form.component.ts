import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-doctor-form',
  templateUrl: './admin-doctor-form.component.html',
  styleUrls: ['./admin-doctor-form.component.css']
})
export class AdminDoctorFormComponent implements OnInit {

  doctorForm: FormGroup;
  doctor: Doctor;
  submitted = false;
  id: number;
  constructor(
    private formBuilder: FormBuilder,
    private service: DoctorService,
    private router: Router,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    //this.getDoctorDetails(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    if (this.id != null) {
      this.getDoctorByID(this.id);

      // this.doctorForm.patchValue({
      //   doctor_no: this.doctor.doctor_no
      //   // name: data["data"].phone_number,
      //   // passport_date: data["data"].id_number_date,
      // })
    }
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
  }
  get f() { return this.doctorForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.doctorForm.invalid) {
      return;
    }
  }

  getDoctorByID(id: number) {
    return this.service.getObjectByID(id)
      .subscribe(
        data => {
          this.doctor = data as Doctor,
          this.doctorForm.patchValue({          
            doctor_no: this.doctor.doctor_no,
            name: this.doctor.name,
          })
        }, (err) => { console.log(err) }
      );
  }
}
