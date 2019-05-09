import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from '@app/_models/users.model';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    currentUser: Users
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit() {
        this.spinner.show();
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })
        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
        }, 1000);
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        // this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
        // if ( this.currentUser.status_code == 200) {
        //     if ( this.currentUser.usable_type == "App\\Employee")
        //          this.router.navigate(['/admin']);
        //     if ( this.currentUser.usable_type == "App\\Patient")
        //         this.router.navigate(['/public']);
        //     if ( this.currentUser.usable_type == "App\\Doctor")
        //         this.router.navigate(['/doctor']);
        //     this.toastr.success("Đăng nhập thành công!", "FIDO!", { timeOut: 1000 });
        // }
        // else {
        //     this.toastr.warning("Username or Password không đúng!", "FiDo!", { timeOut: 1000 });
        // }

        this.authenticationService.login(this.loginForm.value).subscribe(
            data => {
                this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
                if ( this.currentUser.status_code == 200) {
                    if ( this.currentUser.usable_type == "App\\Employee")
                         this.router.navigate(['/admin']);
                    if ( this.currentUser.usable_type == "App\\Patient")
                        this.router.navigate(['/public']);
                    if ( this.currentUser.usable_type == "App\\Doctor")
                        this.router.navigate(['/doctor']);
                    this.toastr.success("Đăng nhập thành công!", "FIDO!", { timeOut: 1000 });
                }
                else {
                    this.toastr.warning("Username or Password không đúng!", "FiDo!", { timeOut: 1000 });
                }                  
            })
    }
}
