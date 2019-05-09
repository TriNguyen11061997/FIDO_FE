import { Injectable } from '@angular/core';
import { Doctor } from '@app/_models/doctor.model';
import { HttpClient } from "@angular/common/http";
import { environment } from '@environments/environment.prod';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  address_id : number;
  name : string;
  formData: Doctor;
  list: Doctor[];
  readonly rootURL = "http://fidoapi.herokuapp.com/api/v1"
  constructor(private http: HttpClient) { }

  getAllObject() {
    return this.http.get(environment.apiUrl + '/doctors');
  }
  getObjectByID(id: number) {
    return this.http.get(environment.apiUrl + '/doctors/' + id);
  }
  update(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/doctors/${formData.get("id")}`, formData);
  }

  add(formData: FormData) {
  return this.http.post(`${environment.apiUrl}/doctors`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/doctors/${id}`);
  }

  get10Object(id: number) {
    return this.http.get(environment.apiUrl + '/doctors-pagination?page=' + id);
  }

  search(formData : FormData){
    return this.http.post(`${environment.apiUrl}/doctors/search`, formData)
  }
}
