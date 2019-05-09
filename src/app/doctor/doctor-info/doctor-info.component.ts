import { Component, OnInit } from '@angular/core';
import { Doctor } from '@app/_models/doctor.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '@app/_models/address.model';
import { Specialist } from '@app/_models/specialist.model';
import { Employee } from '@app/_models/employee.model';
import { DoctorService } from '@app/_services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@app/_services/address.service';
import { SpecialistService } from '@app/_services/specialist.service';
import { EmployeeService } from '@app/_services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/_services';
import { Users } from '@app/_models/users.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {

  currentUser: Users;
  doctorForm: FormGroup;
  doctor: Doctor = null;
  speciallists: Specialist[];
  addresses: Address[];
  employees: Employee[];
  submitted = false;
  id: number;
  fileAvatar = null;
  image: String = null;
  check: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private specilistService: SpecialistService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: AuthenticationService
  ) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user })
  }

  ngOnInit() {
    //this.getDoctorDetails(this.route.snapshot.params['id']);
    this.id = this.currentUser.usable_id;
    this.spinner.show()
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
        this.spinner.hide()
        this.speciallists = data as Specialist[]
      }, (err) => { }
    );
    if (this.id != null) {
      this.getDoctorByID(this.id);
    }
    this.doctorForm = this.formBuilder.group({
      id: [],
      doctor_no: [],
      name: [null, Validators.required],
      avatar: [null],
      birthday: [null, Validators.required],
      description: [null, Validators.required],
      gender: [null, Validators.required],
      id_number: [null, Validators.required],
      id_number_place: [null, Validators.required],
      id_number_date: [null, Validators.required],
      phone_number: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      employee_id: [null],
      hospital_name: [null, Validators.required],
      address_details: [null],
      address_id: [null],
      specialist_id: [null],
      sub_specialist_id: [null],
      experience: [null],
      title: [null]
    });
  }
  get f() { return this.doctorForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.doctorForm.invalid) {
      return;
    }
    this.update();
  }

  getDoctorByID(id: number) {
    return this.service.getObjectByID(id)
      .subscribe(
        data => {
          this.doctor = data as Doctor;
          if (this.doctor.avatar != null) {
            this.check = true;
            this.image = this.doctor.avatar
          }
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
            address_id: this.doctor.address_id,
            address_details: this.doctor.address_details,
            specialist_id: this.doctor.specialist_id,
            sub_specialist_id: this.doctor.sub_specialist_id,
            experience: this.doctor.experience,
            title: this.doctor.title
          })
        }, (err) => { console.log(err) }
      );
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.fileAvatar = <File>event.target.files[0];
    }
  }

  update() {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('id', this.doctorForm.get('id').value);
    formData.append('name', this.doctorForm.get('name').value);
    if (this.fileAvatar != null) {
      formData.append('avatar', this.fileAvatar);
    }
    formData.append('birthday', this.doctorForm.get('birthday').value);
    formData.append('gender', this.doctorForm.get('gender').value);
    formData.append('id_number', this.doctorForm.get('id_number').value);
    formData.append('id_number_place', this.doctorForm.get('id_number_place').value);
    formData.append('id_number_date', this.doctorForm.get('id_number_date').value);
    formData.append('phone_number', this.doctorForm.get('phone_number').value);
    formData.append('email', this.doctorForm.get('email').value);

    if (this.doctorForm.get('address_id').value != null)
      formData.append('address_id', this.doctorForm.get('address_id').value);
    formData.append('description', this.doctorForm.get('description').value);
    if (this.doctorForm.get('sub_specialist_id').value != null)
      formData.append('sub_specialist_id', this.doctorForm.get('sub_specialist_id').value);
    if (this.doctorForm.get('specialist_id').value != null)
      formData.append('specialist_id', this.doctorForm.get('specialist_id').value);

    formData.append('address_details', this.doctorForm.get('address_details').value);
    formData.append('experience', this.doctorForm.get('experience').value);
    formData.append('hospital_name', this.doctorForm.get('hospital_name').value);
    formData.append('title', this.doctorForm.get('title').value);
    this.service.update(formData).subscribe(
      data => {
        this.toastr.success("Đã cập nhật thành công!", "FIDO!");
        this.router.navigate(['/doctor'])
      }, (err) => { this.toastr.error(err) }
    )
  }

}
