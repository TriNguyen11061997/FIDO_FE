import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';

@Component({
  selector: 'app-admin-doctor',
  templateUrl: './admin-doctor.component.html',
  styleUrls: ['./admin-doctor.component.css']
})
export class AdminDoctorComponent implements OnInit {

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getAllObject();
  }

}
