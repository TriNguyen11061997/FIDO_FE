import { Injectable } from '@angular/core';
import { Doctor } from '@app/_models/doctor.model';
import { HttpClient } from "@angular/common/http";
import { environment } from '@environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  formData: Doctor;
  list: Doctor[];
  readonly rootURL = "http://fidoapi.herokuapp.com/api/v1"
  constructor(private http: HttpClient) { }

  getAllObject() {
    return this.http.get(this.rootURL + '/doctors')
  }
  getObjectByID(id: number) {
    return this.http.get(this.rootURL + '/doctors/' + id);
  }
  update(doctors: Doctor) {
    return this.http.put(`${environment.apiUrl}/doctors/${doctors.id}`, doctors);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/doctors/${id}`);
  }
}
