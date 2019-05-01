import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.prod';

import { HttpClient } from '@angular/common/http';
import { Rating } from '@app/_models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private http: HttpClient
  ) { }

  getAllObject() {
    return this.http.get(environment.apiUrl + '/doctors');
  }
  getObjectByDoctorID(id: number){
    return this.http.get(`${environment.apiUrl}/doctors/${id}/ratings`);
  }
  update(rv: Rating) {
    return this.http.put(`${environment.apiUrl}/doctors/${rv.id}`, rv);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/patients/${id}`);
  }

  add(rv: Rating) {
    return this.http.post(`${environment.apiUrl}/doctors/${rv.doctor_id}/ratings`, rv);
  }
}
