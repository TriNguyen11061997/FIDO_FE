import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '@app/_models/users.model';
import { Employee } from '@app/_models/employee.model';
import { Address } from '@app/_models/address.model';
import { EmployeeService } from '@app/_services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@app/_services/address.service';
import { AuthenticationService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {
  currentUser: Users;
  employeeForm: FormGroup;
  employee: Employee = null;
  addresses: Address[];
  submitted = false;
  id: number;
  fileAvatar = null;
  image: String = null;
  check: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: EmployeeService,
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
    //this.getemployeeDetails(this.route.snapshot.params['id']);
    this.id = this.currentUser.usable_id;
    this.addressService.getAllObject().subscribe(
      data => {
        this.addresses = data as Address[]
      });
    if (this.id != null) {
      this.spinner.show()
      this.service.getObjectByID(this.id)
        .subscribe(
          data => {
            this.spinner.hide()
            this.employee = data["data"] as Employee;
            if (this.employee.avatar != null) {
              this.check = true;
              this.image = this.employee.avatar
            }
            this.employeeForm.patchValue({
              id: this.employee.id,
              employee_no: this.employee.employee_no,
              name: this.employee.name,
              //avatar : this.employee.avatar,
              birthday: this.employee.birthday,
              description: this.employee.description,
              gender: this.employee.gender,
              id_number: this.employee.id_number,
              id_number_place: this.employee.id_number_place,
              id_number_date: this.employee.id_number_date,
              passport_no: this.employee.passport_no,
              passport_date: this.employee.passport_date,
              passport_place: this.employee.passport_place,
              phone_number: this.employee.phone_number,
              email: this.employee.email,
              address_id: this.employee.address_id,
              start_date: this.employee.start_date,
              end_date: this.employee.end_date,
              tax_number: this.employee.tax_number,
              address_details: this.employee.address_details
            })
          }, (err) => { console.log(err) }
        );
    }
    this.employeeForm = this.formBuilder.group({
      id: [],
      employee_no: [],
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
      address_details: [null],
      address_id: ["Địa chỉ"],
      start_date: [null],
      end_date: [null],
      tax_number: [""],
    });
  }
  get f() { return this.employeeForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    this.update();
  }

  getEmployeeByID(id: number) {
    this.service.getObjectByID(id)
      .subscribe(
        data => {
          this.employee = data["data"] as Employee;
          if (this.employee.avatar != null) {
            this.check = true;
            this.image = this.employee.avatar
          }
          this.employeeForm.patchValue({
            id: this.employee.id,
            employee_no: this.employee.employee_no,
            name: this.employee.name,
            //avatar : this.employee.avatar,
            birthday: this.employee.birthday,
            description: this.employee.description,
            gender: this.employee.gender,
            id_number: this.employee.id_number,
            id_number_place: this.employee.id_number_place,
            id_number_date: this.employee.id_number_date,
            passport_no: this.employee.passport_no,
            passport_date: this.employee.passport_date,
            passport_place: this.employee.passport_place,
            phone_number: this.employee.phone_number,
            email: this.employee.email,
            address_id: this.employee.address_id,
            start_date: this.employee.start_date,
            end_date: this.employee.end_date,
            tax_number: this.employee.tax_number,
            address_details: this.employee.address_details
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
    formData.append('id', this.employeeForm.get('id').value);
    formData.append('name', this.employeeForm.get('name').value);
    if (this.fileAvatar != null) {
      formData.append('avatar', this.fileAvatar);
    }
    formData.append('birthday', this.employeeForm.get('birthday').value);
    formData.append('gender', this.employeeForm.get('gender').value);
    formData.append('phone_number', this.employeeForm.get('phone_number').value);
    formData.append('id_number_place', this.employeeForm.get('id_number_place').value);
    formData.append('id_number_date', this.employeeForm.get('id_number_date').value);
    formData.append('id_number', this.employeeForm.get('id_number').value);
    formData.append('passport_no', this.employeeForm.get('passport_no').value);
    formData.append('passport_date', this.employeeForm.get('passport_date').value);
    formData.append('passport_place', this.employeeForm.get('passport_place').value);
    formData.append('email', this.employeeForm.get('email').value);
    formData.append('address_id', this.employeeForm.get('address_id').value);
    formData.append('description', this.employeeForm.get('description').value);
    formData.append('address_details', this.employeeForm.get('address_details').value);
    formData.append('tax_number', this.employeeForm.get('tax_number').value);
    this.service.update(formData).subscribe(
      data => {
        this.toastr.success("Đã cập nhật thành công!", "FIDO!");
        this.router.navigate(['/admin'])
      }, (err) => { this.toastr.error(err) }
    )
  }

}
