import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usergroup } from '@app/_models/usergroup.model';
import { Http, Response } from '@angular/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsergroupService {
  formData: Usergroup;
  list: Usergroup[];
  readonly rootURL = "http://fidoapi.herokuapp.com/api/v1"
  constructor(private http: HttpClient) {
  }

  getAllObject() {
    this.http.get(environment.apiUrl + '/groups')
      .toPromise()
      .then(res => this.list = res[0] as Usergroup[]);
  }
  getObjectByID(id: number):Observable<Usergroup> {
    return this.http.get<Usergroup>(environment.apiUrl + '/groups/' + id);
  }
}
