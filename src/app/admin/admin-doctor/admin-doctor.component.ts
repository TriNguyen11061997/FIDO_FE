import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';

@Component({
  selector: 'app-admin-doctor',
  templateUrl: './admin-doctor.component.html',
  styleUrls: ['./admin-doctor.component.css']
})
export class AdminDoctorComponent implements OnInit {

  constructor(private doctorService: DoctorService) {
  }
  
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.doctorService.getAllObject();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}
