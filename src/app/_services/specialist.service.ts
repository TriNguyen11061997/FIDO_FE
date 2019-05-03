import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Specialist } from '@app/_models/specialist.model';


@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  constructor(
    private http : HttpClient,
  ) { }
  
  getAllObject(){
    return this.http.get<Specialist[]>(environment.apiUrl + "/specialists");
  }
}
