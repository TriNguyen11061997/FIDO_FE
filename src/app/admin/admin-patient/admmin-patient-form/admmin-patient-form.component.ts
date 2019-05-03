import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Specialist } from '@app/_models/specialist.model';
import { Address } from '@app/_models/address.model';
import { Doctor } from '@app/_models/doctor.model';
import { DoctorService } from '@app/_services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@app/_services/address.service';
import { SpecialistService } from '@app/_services/specialist.service';
import { Patient } from '@app/_models/patient.model';
import { PatientService } from '@app/_services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admmin-patient-form',
  templateUrl: './admmin-patient-form.component.html',
  styleUrls: ['./admmin-patient-form.component.css']
})
export class AdmminPatientFormComponent implements OnInit {

  patientForm: FormGroup;
  patient: Patient;
  speciallists: Specialist[];
  addresses: Address[];
  submitted = false;
  btn_delete: boolean = false;
  id: number;
  constructor(
    private formBuilder: FormBuilder,
    private service: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private specilistService: SpecialistService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    //this.getDoctorDetails(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.addressService.getAllObject().subscribe(
      data => {
        this.addresses = data as Address[]
      });
    if (this.id != null) {
      this.getDoctorByID(this.id);
      this.btn_delete = true;
    }
    this.patientForm = this.formBuilder.group({
      id: [null],
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
      address_id: [null],
      address_detail: [null],
    });
  }
  get f() { return this.patientForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.patientForm.invalid) {
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
          this.patient = data["data"] as Patient,
            this.patientForm.patchValue({
              id: this.patient.id,
              name: this.patient.name,
              //avatar : this.doctor.avatar,
              birthday: this.patient.birthday,
              description: this.patient.description,
              gender: this.patient.gender,
              id_number: this.patient.id_number,
              id_number_place: this.patient.id_number_place,
              id_number_date: this.patient.id_number_date,
              phone_number: this.patient.phone_number,
              email: this.patient.email,
              address_id: this.patient.address_id
            })
        }, (err) => { console.log(err) }
      );
  }

  update() {
    this.service.update(this.patientForm.value).subscribe(
      data => {
        this.toastr.success("Đã cập nhật thành công!", "FIDO!")
        this.router.navigate(['/admin/patient'])

      }, (err) => { this.toastr.error(err) }
    )
  }

  add() {
    this.service.add(this.patientForm.value).subscribe(
      data => {
        if (data["status_code"] == 201) {
          this.toastr.success("Đã thêm thành công!", "FIDO!");
          this.router.navigate(['/admin/patient'])
        }
        else
          this.toastr.error("Email or CMND đã tồn tại", "FIDO!")
      }, (err) => { this.toastr.error(err) }
    )
  }

  OnDelete(id:number){
    if(confirm("Bạn có chắc chắn muốn xóa?")) {
      this.service.delete(id).subscribe(
        data => {
          this.toastr.success("Đã xóa thành công" ,"FIDO!");
          console.log(id);
          this.router.navigate(['/admin/patient'])
        }, (err) => {  this.toastr.error("Xóa không thành công","FIDO!")});
    }
  }


}
