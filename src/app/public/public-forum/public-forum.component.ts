import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-public-forum',
  templateUrl: './public-forum.component.html',
  styleUrls: ['./public-forum.component.css']
})
export class PublicForumComponent implements OnInit {
  doctorForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.doctorForm = this.formBuilder.group({
      doctor_no: ['', Validators.required],
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      birthday: ['', Validators.required],
      description: ['', Validators.required],
      gender: ['', Validators.required],
      id_number: ['', Validators.required],
      id_number_place: ['', Validators.required],
      id_number_date: ['', Validators.required],
      passport_no: [''],
      passport_place: [''],
      passport_date: [''],
      phone_no_1: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fk_employee_id: [''],
      specialist: ['', Validators.required],
      hospital_name: ['', Validators.required]
    })
  }
  get f() { return this.doctorForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.doctorForm.invalid) {
      return;
    }
  }
}
