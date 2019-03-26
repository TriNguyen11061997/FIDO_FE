import { Component, OnInit } from '@angular/core';
import { PatientService } from '@app/_services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService:PatientService) { }

  ngOnInit() {
    this.patientService.getAllObject();
  }

}
