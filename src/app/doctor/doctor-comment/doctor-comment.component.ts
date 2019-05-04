import { Component, OnInit } from '@angular/core';
import { Rating } from '@app/_models/rating.model';
import { Router } from '@angular/router';
import { RatingService } from '@app/_services/rating.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Users } from '@app/_models/users.model';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-doctor-comment',
  templateUrl: './doctor-comment.component.html',
  styleUrls: ['./doctor-comment.component.css']
})
export class DoctorCommentComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  ratings: Rating[] = [];
  currentUser : Users;
  constructor(
    private ratingService: RatingService,
    private toastr : ToastrService,
    private router : Router,
    private userService : AuthenticationService
  ) {
    this.userService.currentUser.subscribe(user => {this.currentUser = user});
  }
  dtTrigger: Subject<Rating> = new Subject();
  ngOnInit() {
    this.LoadDoctor();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }

  LoadDoctor(){
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


}
