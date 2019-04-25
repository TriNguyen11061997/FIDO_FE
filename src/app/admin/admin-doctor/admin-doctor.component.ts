import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { Subject, Observable } from 'rxjs';
@Component({
  selector: 'app-admin-doctor',
  templateUrl: './admin-doctor.component.html',
  styleUrls: ['./admin-doctor.component.css']
})
export class AdminDoctorComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  doctors: Doctor[] = [];
  constructor(private doctorService: DoctorService) {
  }
  dtTrigger: Subject<Doctor> = new Subject();
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
    this.doctorService.getAllObject()
      .subscribe(
        data => {
          this.doctors = data["data"][0];
          this.dtTrigger.next();
        }, (err) => { alert(err) }
      );
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
