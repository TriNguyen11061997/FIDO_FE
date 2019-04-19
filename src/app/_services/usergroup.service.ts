import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usergroup } from '@app/_models/usergroup.model';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

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
    this.http.get(this.rootURL + '/groups')
      .toPromise()
      .then(res => this.list = res[0] as Usergroup[]);
  }

}
