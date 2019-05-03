import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '@app/_services/address.service';
import { SpecialistService } from '@app/_services/specialist.service';
import { Specialist } from '@app/_models/specialist.model';
import { Address } from '@app/_models/address.model';
import { EmployeeService } from '@app/_services/employee.service';
import { Employee } from '@app/_models/employee.model';

@Component({
  selector: 'app-admin-doctor-form',
  templateUrl: './admin-doctor-form.component.html',
  styleUrls: ['./admin-doctor-form.component.css']
})
export class AdminDoctorFormComponent implements OnInit {

  doctorForm: FormGroup;
  doctor: Doctor;
  speciallists: Specialist[];
  addresses: Address[];
  employees: Employee[];
  submitted = false;
  id: number;
  btn_delete: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private specilistService: SpecialistService,
    private employeeService : EmployeeService
  ) { }

  ngOnInit() {
    //this.getDoctorDetails(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.addressService.getAllObject().subscribe(
      data => {
        this.addresses = data as Address[]
      });
    this.specilistService.getAllObject().subscribe(
      data => {
        this.speciallists = data as Specialist[]
      }, (err) => { }
    );
    this.specilistService.getAllObject().subscribe(
      data => {
        this.speciallists = data as Specialist[]
      }, (err) => { }
    );
    this.employeeService.getAllObject().subscribe(
      data => {
        this.employees = data["data"] as Employee[] 
      }, (err) => { }
    );
    if (this.id != null) {
      this.getDoctorByID(this.id);
      this.btn_delete = true;
    }
    this.doctorForm = this.formBuilder.group({
      id: [],
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
      phone_number: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      employee_id: [null],
      hospital_name: [null, Validators.required],
      address_details : [null],
      address_id :[null],
      specialist_id : [null],
      sub_specialist_id : [null],

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
              id: this.doctor.id,
              doctor_no: this.doctor.doctor_no,
              name: this.doctor.name,
              //avatar : this.doctor.avatar,
              birthday: this.doctor.birthday,
              description: this.doctor.description,
              gender: this.doctor.gender,
              id_number: this.doctor.id_number,
              id_number_place: this.doctor.id_number_place,
              id_number_date: this.doctor.id_number_date,
              phone_number: this.doctor.phone_number,
              email: this.doctor.email,
              hospital_name: this.doctor.hospital_name,
              address_id : this.doctor.address_id,
              address_details : this.doctor.address_details,
              specialist_id : this.doctor.specialist_id,
              sub_specialist_id : this.doctor.sub_specialist_id,
              employee_id : this.doctor.employee_id
            })
        }, (err) => { console.log(err) }
      );
  }
}
