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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-doctor-form',
  templateUrl: './admin-doctor-form.component.html',
  styleUrls: ['./admin-doctor-form.component.css']
})
export class AdminDoctorFormComponent implements OnInit {

  doctorForm: FormGroup;
  doctor: Doctor = null;
  speciallists: Specialist[];
  addresses: Address[];
  employees: Employee[];
  submitted = false;
  id: number;
  btn_delete: boolean = false;
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
    private toastr: ToastrService
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
      doctor_no: [],
      name: [null, Validators.required],
      avatar: [null],
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
      address_details: [null],
      address_id: ["Địa chỉ"],
      specialist_id: ["Chuyên khoa"],
      sub_specialist_id: ["Chuyên khoa"],
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
    if (this.id != null) {
      this.update();
    }
    else {
      this.add();
    }
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
            employee_id: this.doctor.employee_id,
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
    formData.append('address_id', this.doctorForm.get('address_id').value);
    formData.append('description', this.doctorForm.get('description').value);
    formData.append('sub_specialist_id', this.doctorForm.get('sub_specialist_id').value);
    formData.append('specialist_id', this.doctorForm.get('specialist_id').value);
    formData.append('address_details', this.doctorForm.get('address_details').value);
    if (this.doctorForm.get('employee_id').value != null) {
      formData.append('employee_id', this.doctorForm.get('employee_id').value);
      formData.append('actived', "1");
    }
    else {
      formData.append('actived', "0");
    }
    formData.append('hospital_name', this.doctorForm.get('hospital_name').value);
    formData.append('experience', this.doctorForm.get('experience').value);
    formData.append('title', this.doctorForm.get('title').value);
    this.service.update(formData).subscribe(
      data => {
        this.toastr.success("Đã cập nhật thành công!", "FIDO!");
        this.router.navigate(['/admin/doctor']);
      }, (err) => { this.toastr.error(err) }
    )
  }

  add() {
    const formData = new FormData();
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
    formData.append('address_id', this.doctorForm.get('address_id').value);
    formData.append('description', this.doctorForm.get('description').value);
    formData.append('sub_specialist_id', this.doctorForm.get('sub_specialist_id').value);
    formData.append('specialist_id', this.doctorForm.get('specialist_id').value);
    formData.append('address_details', this.doctorForm.get('address_details').value);
    if (this.doctorForm.get('employee_id').value != null) {
      formData.append('employee_id', this.doctorForm.get('employee_id').value);
      formData.append('actived', "1");
    }
    else{
      formData.append('actived', "0");
    }
    formData.append('hospital_name', this.doctorForm.get('hospital_name').value);
    formData.append('experience', this.doctorForm.get('experience').value);
    formData.append('title', this.doctorForm.get('title').value);
    this.service.add(formData).subscribe(
      data => {
        if (data["status_code"] == 201) {
          this.toastr.success("Đã thêm thành công!", "FIDO!");
          this.router.navigate(['/admin/doctor'])
        }
        else
          this.toastr.error("Email or CMND đã tồn tại", "FIDO!")
      }, (err) => { this.toastr.error(err) }
    )
  }

  onDelete(id: number) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      this.service.delete(id).subscribe(
        data => {
          this.toastr.success("Đã xóa thành công", "FIDO!");
          console.log(id);
          this.router.navigate(['/admin/doctor'])
        }, (err) => { this.toastr.error("Xóa không thành công", "FIDO!") });
    }
  }
}
