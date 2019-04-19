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
    readonly rootURL = "http://fidoapi.herokuapp.com/api/v1";
    formData : Users;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser1')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Users {
        return this.currentUserSubject.value;
    }

    login(formData:Users) {
        return this.http.post<any>(this.rootURL+"/signin",formData)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user[0]['object']) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser1', JSON.stringify(user[0]['object']));
                    this.currentUserSubject.next(user[0]['object']);
                }

                return user[0]['object'];
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser1');
        this.currentUserSubject.next(null);
    }
}