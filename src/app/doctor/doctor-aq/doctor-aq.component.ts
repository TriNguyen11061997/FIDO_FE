import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { AqService } from '@app/_services/aq.service';
import { Subject } from 'rxjs';
import { Aq } from '@app/_models/aq.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-doctor-aq',
  templateUrl: './doctor-aq.component.html',
  styleUrls: ['./doctor-aq.component.css']
})
export class DoctorAqComponent implements OnInit {
  id: number;
  aqs: Aq[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Aq> = new Subject();
  constructor(
    private userSerivce: AuthenticationService,
    private spinner: NgxSpinnerService,
    private aqService: AqService
  ) {
    this.userSerivce.currentUser.subscribe(x => { this.id = x.usable_id })
  }

  ngOnInit() {
    this.spinner.show()
    this.aqService.getObjectByDoctorID(this.id).subscribe(
      data => {
        this.spinner.hide(),
          this.dtTrigger.next();
        this.aqs = data as Aq[]
      }
    )
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
