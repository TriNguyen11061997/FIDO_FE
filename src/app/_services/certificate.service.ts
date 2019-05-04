import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Certificate } from '@app/_models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  formData: Certificate;
  list: Certificate[];
  constructor(private http: HttpClient) { }


  getAllObject(idDoctor: number) {
    return this.http.get(environment.apiUrl + '/doctors/' + idDoctor + '/certificates')
      .subscribe(
        data => {
          this.list = data as Certificate[]
        }
      );
  }
  getObjectByID(id: number) {
    return this.http.get<Certificate>(environment.apiUrl + '/certificates/' + id);
  }
  update(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/doctors/${formData.get("doctor_id")}/certificates/${formData.get("id")}`, formData);
  }

  delete(id: number,idDoctor : number) {
    return this.http.delete(`${environment.apiUrl}/doctors/${idDoctor}/certificates/${id}`);
  }

  add(formData: FormData) {
    return this.http.post(environment.apiUrl+'/doctors/' + formData.get("doctor_id") + "/certificates", formData);
  }
}
