import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.prod';
import { Aq } from '@app/_models/aq.model';

@Injectable({
  providedIn: 'root'
})
export class AqService {

  constructor(private http: HttpClient) { }


  getObjectByDoctorID(doctor_id : number) {
    return this.http.get(environment.apiUrl + '/doctors/' + doctor_id + '/questions');
  }
  getObjectByID(id: number,doctor_id : number){
    return this.http.get(environment.apiUrl + '/doctors/' + doctor_id + '/questions/' + id);
  }
  update(aq: Aq) {
    return this.http.post(`${environment.apiUrl}/doctors/${aq.doctor_id}/questions/${aq.id}`, aq);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/employees/${id}`);
  }

  add(aq : Aq) {
    return this.http.post(`${environment.apiUrl}/doctors/${aq.doctor_id}/questions`, aq);
  }
}
