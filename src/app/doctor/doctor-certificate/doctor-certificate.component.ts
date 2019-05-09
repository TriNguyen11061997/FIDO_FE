import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-doctor-certificate',
  templateUrl: './doctor-certificate.component.html',
  styleUrls: ['./doctor-certificate.component.css']
})
export class DoctorCertificateComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
  }

}
