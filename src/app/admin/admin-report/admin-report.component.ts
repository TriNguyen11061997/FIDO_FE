import { Component, OnInit } from '@angular/core';
import { Rating } from '@app/_models/rating.model';
import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';
import { RatingService } from '@app/_services/rating.service';
import { ToastrService } from 'ngx-toastr';
import { Users } from '@app/_models/users.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  ratings: Rating[] = [];
  currentUser: Users;
  constructor(
    private ratingService: RatingService,
    private toastr: ToastrService,
    private router: Router,
    private userService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user });
  }
  ngOnInit() {
    this.spinner.show()
    this.LoadDoctor();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }

  LoadDoctor() {
    this.ratingService.getObjectReported()
      .subscribe(
        data => {
          this.spinner.hide()
          this.ratings = data as Rating[];
        }, (err) => { alert(err) }
      );
  }

  onDelete(id: number, doctor_id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      this.spinner.show()
      this.ratingService.delete(id,doctor_id).subscribe(
        data=>{
          this.spinner.hide()
          this.toastr.success("Xóa thành công!","FIDO!", { timeOut: 1000 });
          this.LoadDoctor();
        },(err)=> { this.toastr.warning("Xóa không thành công!","FIDO!", { timeOut: 1000 });}
      )
    }
  }

  onReport(id: number) {
    if (confirm('Bạn có chắc chắn muốn report?')) {
      let rate: Rating;
      this.ratingService.getObjectByID(id, this.currentUser.usable_id).subscribe(
        data => {
          if (data["status_code"] != 401) {
            rate = data as Rating;
            rate.report = 1;
            this.ratingService.update(rate).subscribe(
              data => {
                if (data["status_code"] == 200) {
                  this.toastr.show("Report thành công!", "FIDO!", { timeOut: 1000 });
                  this.LoadDoctor();
                }
                else {
                  this.toastr.warning("Report không  thành công!", "FIDO!", { timeOut: 1000 });
                }
              }
            );
          }
          else {
            this.toastr.warning("Report không thành thành công!", "FIDO!", { timeOut: 1000 });
          }
        }, (err) => { this.toastr.error(err) }
      )
    }
  }

}
