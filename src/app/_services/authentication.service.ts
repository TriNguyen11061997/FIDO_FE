import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Users } from '@app/_models/users.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Users>;
    public currentUser: Observable<Users>;
    formData: Users;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser2')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Users {
        return this.currentUserSubject.value;
    }

    login(formData: Users) {
        return this.http.post(environment.apiUrl + "/login", formData)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user["access_token"]) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes           
                    formData.usable_id = user["usable_id"];
                    formData.name = user["data"]["name"];
                    formData.avatar = user["data"]["avatar"];
                    formData.email = user["data"]["email"];
                    formData.remember_token = user["access_token"];
                    formData.usable_type = user["usable_type"];
                    if (user["status_code"] != null)
                        formData.status_code = user["status_code"];
                    if (user["data"]["role"])
                        formData.role = user["data"]["role"];
                    //console.log(user["data"]["data"]["name"]);
                    localStorage.setItem('currentUser2', JSON.stringify(formData));
                    this.currentUserSubject.next(formData);
                }
                else {
                    formData.status_code = user["status_code"];
                }
                return formData;
            }))
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser2');
        this.currentUserSubject.next(null);
    }
}