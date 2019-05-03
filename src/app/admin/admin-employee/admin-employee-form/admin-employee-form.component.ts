import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '@app/_models/employee.model';
import { Address } from '@app/_models/address.model';
import { EmployeeService } from '@app/_services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@app/_services/address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-employee-form',
  templateUrl: './admin-employee-form.component.html',
  styleUrls: ['./admin-employee-form.component.css']
})
export class AdminEmployeeFormComponent implements OnInit {
  emloyeeForm: FormGroup;
  employee: Employee;
  addresses: Address[];
  submitted = false;
  btn_delete: boolean = false;
  id: number;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
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
      this.getEmployeeByID(this.id);
      this.btn_delete = true;
    }
    this.emloyeeForm = this.formBuilder.group({
      id: [null],
      employee_no :[null],
      name: [null, Validators.required],
      avatar: [null],
      tax_number : [null, Validators.required],
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
      address_id: [null],
      address_detail: [null],
      start_date: [null],
      end_date: [null],
    });
  }
  get f() { return this.emloyeeForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.emloyeeForm.invalid) {
      return;
    }
    if (this.id != null) {
      this.update();
    }
    else {
      this.add();
    }
  }

  getEmployeeByID(id: number) {
    return this.employeeService.getObjectByID(id)
      .subscribe(
        data => {
          this.employee = data["data"] as Employee,
            this.emloyeeForm.patchValue({
              id: this.employee.id,
              name: this.employee.name,
              tax_number : this.employee.tax_number,
              employee_no : this.employee.employee_no,
              //avatar : this.doctor.avatar,
              birthday: this.employee.birthday,
              description: this.employee.description,
              gender: this.employee.gender,
              id_number: this.employee.id_number,
              id_number_place: this.employee.id_number_place,
              id_number_date: this.employee.id_number_date,
              phone_number: this.employee.phone_number,
              passport_no: this.employee.passport_no,
              passport_date: this.employee.passport_date,
              passport_place: this.employee.passport_place,
              email: this.employee.email,
              //address_id: this.employee.address_id,
              start_date : this.employee.start_date,
              end_date : this.employee.end_date

            })
        }, (err) => { console.log(err) }
      );
  }

  update() {
    this.employeeService.update(this.emloyeeForm.value).subscribe(
      data => {
        this.toastr.success("Đã cập nhật thành công!", "FIDO!")
        this.router.navigate(['/admin/employee'])

      }, (err) => { this.toastr.error(err) }
    )
  }

  add() {
    this.employeeService.add(this.emloyeeForm.value).subscribe(
      data => {
        if (data["status_code"] == 201) {
          this.toastr.success("Đã thêm thành công!", "FIDO!");
          this.router.navigate(['/admin/employee'])
        }
        else
          this.toastr.error("Email or CMND đã tồn tại", "FIDO!")
      }, (err) => { this.toastr.error(err) }
    )
  }

  OnDelete(id:number){
    if(confirm("Bạn có chắc chắn muốn xóa?")) {
      this.employeeService.delete(id).subscribe(
        data => {
          this.toastr.success("Đã xóa thành công" ,"FIDO!");
          console.log(id);
          this.router.navigate(['/admin/employee'])
        }, (err) => {  this.toastr.error("Xóa không thành công","FIDO!")});
    }
  }

}
