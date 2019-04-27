import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { Subject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-doctor',
  templateUrl: './admin-doctor.component.html',
  styleUrls: ['./admin-doctor.component.css']
})
export class AdminDoctorComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  doctors: Doctor[] = [];
  constructor(
    private doctorService: DoctorService,
    private toastr : ToastrService,
    private router : Router
  ) {
  }
  dtTrigger: Subject<Doctor> = new Subject();
  ngOnInit() {
    this.LoadDoctor();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }

  LoadDoctor(){
    this.doctorService.getAllObject()
      .subscribe(
        data => {
          this.doctors = data["data"] as Doctor[];
          this.dtTrigger.next();
        }, (err) => { alert(err) }
      );
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  Delete(id) {
    if(confirm("Bạn có chắc chắn muốn xóa?")) {
      this.doctorService.delete(id).subscribe(
        data => {
          this.toastr.success("Đã xóa thành công","FIDO!");
          this.ngOnInit();
        }, (err) => {  this.toastr.error("Xóa không thành công","FIDO!")});
    }
  }

}
