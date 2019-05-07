import { Injectable } from '@angular/core';
import { Patient } from '@app/_models/patient.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '@app/_models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }


  getAllObject() {
    return this.http.get(environment.apiUrl + '/employees');
  }
  getObjectByID(id: number): Observable<Employee> {
    return this.http.get<Employee>(environment.apiUrl + '/employees/' + id);
  }
  update(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/employees/${formData.get("id")}`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/employees/${id}`);
  }

  add(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/employees`, formData);
  }
}
