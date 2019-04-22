import { Injectable } from '@angular/core';
import { Patient } from '@app/_models/patient.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  formData: Patient;
  list: Patient[];
  readonly rootURL = "http://fidoapi.herokuapp.com/api/v1"
  constructor(private http: HttpClient) { }

  getAllObject() {
    this.http.get(this.rootURL + '/patients')
      .toPromise().then(res => this.list = res[0] as Patient[]);
  }
  getObjectByID(id: number): Observable<Patient> {
    return this.http.get<Patient>(environment.apiUrl + '/patients/' + id);
  }
  update(patient: Patient) {
    return this.http.put(`${environment.apiUrl}/patients/${patient.id}`, patient);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/patients/${id}`);
  }
}
