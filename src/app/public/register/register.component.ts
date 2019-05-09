import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '@app/_helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@app/_services';
import { timeout } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '@app/_services/address.service';
import { SpecialistService } from '@app/_services/specialist.service';
import { Specialist } from '@app/_models/specialist.model';
import { Address } from '@app/_models/address.model';
import { error } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserForm: FormGroup;
  registerDoctorForm: FormGroup;
  addresses: Address[];
  specialists: Specialist[];
  submitted = false;
  submitted1 = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private specialistService: SpecialistService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.addressService.getAllObject().subscribe(
      data => {
        this.addresses = data as Address[]
      }, (err) => { }
    );
    this.specialistService.getAllObject().subscribe(
      data => {
        this.spinner.hide()
        this.specialists = data as Specialist[]
      }, (err) => { }
    );

    this.registerUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: [''],
      usable_type: ['App\\Patient']
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    this.registerDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      usable_type: ['App\\Doctor'],
      address_id: ['Địa chỉ'],
      specialist_id: ['Chuyên khoa']
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }
  get f() { return this.registerUserForm.controls; }
  get f1() { return this.registerDoctorForm.controls; }
  onSubmitUser() {
    this.submitted = true;
    //this.toastr.success("Đăng ký thành công!","FiDo!",{timeOut:1000})
    if (this.registerUserForm.invalid) {
      return;
    }

    this.userService.register(this.registerUserForm.value).subscribe(
      data => {
        if (data["status_code"] == 200) {
          this.toastr.success("Đăng kí thành công!", "FIDO!", { timeOut: 1000 });
          this.router.navigate(["/login"]);
        }
        else {
          this.toastr.warning("Email đã tồn tại or Password không đúng!", "FIDO!", { timeOut: 1000 })
        }

      }, error => {
        console.error();
        this.toastr.warning("Email đã tồn tại or Password không đúng!", "FIDO!", { timeOut: 1000 })
      }
    )

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerUserForm.value))
  }
  onSubmitDoctor() {
    this.submitted1 = true;
    if (this.registerDoctorForm.invalid) {
      return;
    }

    this.userService.register(this.registerDoctorForm.value).subscribe(
      data => {
        if (data["status_code"] == 200) {
          this.router.navigate(["/login"]);
          this.toastr.success("Đăng kí thành công!", "FIDO!", { timeOut: 1000 })
        } else {
          this.toastr.warning("Email đã tồn tại or Password không đúng!", "FIDO!", { timeOut: 1000 })
        }
      }, (err) => { this.toastr.warning("Email đã tồn tại or Password không đúng!", "FIDO!", { timeOut: 1000 }) }
    )
  }
}
