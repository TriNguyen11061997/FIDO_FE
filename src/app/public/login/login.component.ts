import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })

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
        this.authenticationService.login(this.loginForm.value)
            .subscribe(
                data => {
                    if (data.status_code == "PASS") {
                        if (data.usable_type == "App\\Admin" || data.usable_type == "App\\Employee")
                            this.router.navigate(['/admin']);
                        if (data.usable_type == "App\\Patient")
                            this.router.navigate(['/public']);
                        if (data.usable_type == "App\\Doctor")
                            this.router.navigate(['/doctor']);
                        this.toastr.success("Đăng nhập thành công!", "FIDO!", { timeOut: 1000 });
                    }
                    else{
                        this.toastr.warning("Username or Password không đúng!", "FiDo!", { timeOut: 1000 });
                    }
                    //console.log(data.name);                  
                })
    }
}
