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
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.usable_type == "App\\Admin")
                        this.router.navigate(['/admin']);
                    if (data.usable_type == "App\\Patient")
                        this.router.navigate(['/public']);
                    if (data.usable_type == "App\\Doctor")
                        this.router.navigate(['/doctor']);
                    //console.log(data.name);
                    this.toastr.success("Đăng nhập thành công!","FIDO!", { timeOut: 2000 });
                    
                },
                error => {
                    //this.authenticationService.logout();
                    this.toastr.error("Đăng nhập không thành công!","FiDo!",{timeOut:2000})
                    //this.loading = false;
                });
    }
}
