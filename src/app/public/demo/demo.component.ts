import { Component, OnInit } from '@angular/core';
import { UsergroupService } from '@app/_services/usergroup.service';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { Usergroup } from '@app/_models/usergroup.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  list: Doctor[];
  list1 : Usergroup[];
  constructor(
    private groupService: UsergroupService,
    private doctorService: DoctorService,
  ) { }

  ngOnInit() {
    //this.groupService.getObjectByID(2);
    this.groupService.getAllObject();
    this.doctorService.getAllObject();
  }

}
