import { Injectable } from '@angular/core';
import { Patient } from '@app/_models/patient.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  formData : Patient;
  list: Patient[];
  readonly rootURL = "http://localhost:64391/api"
  constructor(private http : HttpClient) { }

  getAllObject(){
    this.http.get(this.rootURL + '/Patients')
      .toPromise().then(res => this.list = res as Patient[]);
  }
}
