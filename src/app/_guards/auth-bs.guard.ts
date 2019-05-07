import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthBSGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && (currentUser.usable_type == "App\\Admin" || currentUser.usable_type == "App\\Employee")) {
            this.router.navigate(['/admin']);
            return true;
        }
        else if (currentUser && currentUser.usable_type == "App\\Patient"){
            this.router.navigate(['/public']);
            return true;
        }
        else if (currentUser && currentUser.usable_type == "App\\Doctor"){
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}