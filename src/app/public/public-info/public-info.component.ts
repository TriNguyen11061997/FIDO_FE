import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '@app/_models/address.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@app/_services/address.service';
import { SpecialistService } from '@app/_services/specialist.service';
import { EmployeeService } from '@app/_services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/_services';
import { Users } from '@app/_models/users.model';
import { PatientService } from '@app/_services/patient.service';
import { Patient } from '@app/_models/patient.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-public-info',
  templateUrl: './public-info.component.html',
  styleUrls: ['./public-info.component.css']
})
export class PublicInfoComponent implements OnInit {

  currentUser: Users;
  patientForm: FormGroup;
  patient: Patient = null;
  addresses: Address[];
  submitted = false;
  id: number;
  fileAvatar = null;
  image: String = null;
  check: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private toastr: ToastrService,
    private userService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user })
  }

  ngOnInit() {
    //this.getpatientDetails(this.route.snapshot.params['id']);
    this.spinner.show();
    this.id = this.currentUser.usable_id;
    this.addressService.getAllObject().subscribe(
      data => {
        this.addresses = data as Address[]
      });
    if (this.id != null) {
      this.getPatientByID(this.id);
    }
    this.patientForm = this.formBuilder.group({
      id: [],
      patient_no: [],
      name: [null, Validators.required],
      avatar: [null],
      birthday: [null, Validators.required],
      description: [null],
      gender: [null, Validators.required],
      id_number: [null],
      id_number_place: [""],
      id_number_date: [null],
      phone_number: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address_details: [null],
      address_id: ["Địa chỉ"],
    });
  }
  get f() { return this.patientForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.patientForm.invalid) {
      return;
    }
    this.update();
  }

  getPatientByID(id: number) {
    return this.service.getObjectByID(id)
      .subscribe(
        data => {
          this.spinner.hide()
          this.patient = data["data"] as Patient;
          if (this.patient.avatar != null) {
            this.check = true;
            this.image = this.patient.avatar
          }
          this.patientForm.patchValue({
            id: this.patient.id,
            name: this.patient.name,
            //avatar : this.patient.avatar,
            birthday: this.patient.birthday,
            description: this.patient.description,
            gender: this.patient.gender,
            id_number: this.patient.id_number,
            id_number_place: this.patient.id_number_place,
            id_number_date: this.patient.id_number_date,
            phone_number: this.patient.phone_number,
            email: this.patient.email,
            address_id: this.patient.address_id,
          })
        }, (err) => { console.log(err) }
      );
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.fileAvatar = <File>event.target.files[0];
      //this.image = event.target.files[0].;
    }
  }

  update() {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('id', this.patientForm.get('id').value);
    formData.append('name', this.patientForm.get('name').value);
    if (this.fileAvatar != null) {
      formData.append('avatar', this.fileAvatar);
    }
    formData.append('birthday', this.patientForm.get('birthday').value);
    formData.append('gender', this.patientForm.get('gender').value);
    formData.append('id_number', this.patientForm.get('id_number').value);
    if (this.patientForm.get('id_number_place').value != null)
      formData.append('id_number_place', this.patientForm.get('id_number_place').value);
    if (this.patientForm.get('id_number_date').value != null)
      formData.append('id_number_date', this.patientForm.get('id_number_date').value);
    formData.append('phone_number', this.patientForm.get('phone_number').value);
    formData.append('email', this.patientForm.get('email').value);
    formData.append('address_id', this.patientForm.get('address_id').value);
    formData.append('description', this.patientForm.get('description').value);
    this.service.update(formData).subscribe(
      data => {
          this.getPatientByID(this.id);
          this.toastr.success("Đã cập nhật thành công!", "FIDO!");
          this.router.navigate(['/public/info']);
      }, (err) => { this.toastr.error(err) }
    )
  }

}
