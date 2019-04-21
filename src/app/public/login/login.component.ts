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
        //this.toastr.success("Đăng nhập thành công!","FiDo!",{timeOut:3000})
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))

        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.group_id == 1)
                        this.router.navigate(['/admin']);
                    if (data.group_id == 2)
                        this.router.navigate(['/public']);
                    if (data.group_id == 3)
                        this.router.navigate(['/doctor']);
                    this.toastr.success("Đăng nhập thành công!", "FiDo!", { timeOut: 3000 })
                },
                error => {
                    this.toastr.error("Đăng nhập không thành công!","FiDo!",{timeOut:3000})
                    this.loading = false;
                });
    }
}
