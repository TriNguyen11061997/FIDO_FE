import { Injectable } from '@angular/core';
import { Doctor } from '@app/_models/doctor.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  formData : Doctor;
  list: Doctor[];
  readonly rootURL = "https://aslmtfido.azurewebsites.net/api"
  constructor(private http : HttpClient) { }

  getAllObject(){
    this.http.get(this.rootURL + '/Doctors')
      .toPromise().then(res => this.list = res as Doctor[]);
  }
}
