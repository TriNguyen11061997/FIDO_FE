import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { PatientService } from '@app/_services/patient.service';
import { Patient } from '@app/_models/patient.model';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-patient',
  templateUrl: './admin-patient.component.html',
  styleUrls: ['./admin-patient.component.css']
})
export class AdminPatientComponent implements OnInit {

  patients: Patient[]
  constructor(private patientService: PatientService
    ,private spinner: NgxSpinnerService) {
  }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Patient> = new Subject();
  ngOnInit() {
    this.spinner.show()
    this.patientService.getAllObject().subscribe(
      data => {
        this.spinner.hide()
        this.dtTrigger.next();
        this.patients = data["data"];
      }, (err) => { alert(err) }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }

}
