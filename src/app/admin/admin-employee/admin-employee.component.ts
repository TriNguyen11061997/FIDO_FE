import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Address } from '@app/_models/address.model';
import { Patient } from '@app/_models/patient.model';
import { Specialist } from '@app/_models/specialist.model';
import { PatientService } from '@app/_services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '@app/_services/address.service';
import { SpecialistService } from '@app/_services/specialist.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Employee } from '@app/_models/employee.model';
import { EmployeeService } from '@app/_services/employee.service';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css']
})
export class AdminEmployeeComponent implements OnInit {

  employees: Employee[]
  constructor(private employeeService: EmployeeService) {
  }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Employee> = new Subject();
  ngOnInit() {
    this.employeeService.getAllObject().subscribe(
      data => {
        this.dtTrigger.next();
        this.employees = data as Employee[];
      }, (err) => { alert(err) }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }

}
