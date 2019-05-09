import { Component, OnInit } from '@angular/core';
import { Rating } from '@app/_models/rating.model';
import { Router } from '@angular/router';
import { RatingService } from '@app/_services/rating.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Users } from '@app/_models/users.model';
import { AuthenticationService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-doctor-comment',
  templateUrl: './doctor-comment.component.html',
  styleUrls: ['./doctor-comment.component.css']
})
export class DoctorCommentComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  ratings: Rating[] = [];
  currentUser: Users;
  constructor(
    private ratingService: RatingService,
    private toastr: ToastrService,
    private router: Router,
    private userService: AuthenticationService,
    private spinner: NgxSpinnerService,
  ) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user });
  }
  dtTrigger: Subject<Rating> = new Subject();
  ngOnInit() {
    this.spinner.show()
    this.ratingService.getObjectByDoctorID(this.currentUser.usable_id)
      .subscribe(
        data => {
          this.spinner.hide()
          this.ratings = data as Rating[];
          this.dtTrigger.next();
        }, (err) => { alert(err) }
      );
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }

  LoadDoctor() {
    this.ratingService.getObjectByDoctorID(this.currentUser.usable_id)
      .subscribe(
        data => {
          this.ratings = data as Rating[];
          this.dtTrigger.next();
        }, (err) => { alert(err) }
      );
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onReport(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
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
