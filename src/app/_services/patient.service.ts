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
  constructor(private http: HttpClient) { }

  getAllObject() {
    return this.http.get(environment.apiUrl+ '/patients');
  }
  getObjectByID(id: number): Observable<Patient> {
    return this.http.get<Patient>(environment.apiUrl + '/patients/' + id);
  }
  update(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/patients/${formData.get("id")}`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/patients/${id}`);
  }

  add(patient: Patient) {
    return this.http.post(environment.apiUrl+"/patients", patient);
  }
}
