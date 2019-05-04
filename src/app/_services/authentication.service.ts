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
        return this.http.post<any>(environment.apiUrl + "/login", formData)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user["data"]) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes           
                    formData.usable_id = user["usable_id"];
                    formData.name = user["data"]["name"];
                    formData.avatar = user["data"]["avatar"];
                    formData.remember_token = user["access_token"];
                    formData.usable_type = user["usable_type"];
                    //console.log(user["data"]["data"]["name"]);
                    localStorage.setItem('currentUser2', JSON.stringify(formData));
                    this.currentUserSubject.next(formData);
                }

                return formData;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser2');
        this.currentUserSubject.next(null);
    }
}