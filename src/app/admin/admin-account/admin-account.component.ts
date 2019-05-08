import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services';
import { Users } from '@app/_models/users.model';
import { PatientService } from '@app/_services/patient.service';
import { Patient } from '@app/_models/patient.model';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  patients: Patient[]
  constructor(
    private userService : PatientService,
  ) { }

  ngOnInit() {
    this.userService.getAllObject().subscribe(
      data=>{
        this.patients = data["data"] as Patient[]
      }
    );
    
  }

}
