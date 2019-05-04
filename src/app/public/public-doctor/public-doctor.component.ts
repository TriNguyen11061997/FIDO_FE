import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { FormGroup } from '@angular/forms';
import { Specialist } from '@app/_models/specialist.model';
import { SpecialistService } from '@app/_services/specialist.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-public-doctor',
  templateUrl: './public-doctor.component.html',
  styleUrls: ['./public-doctor.component.css']
})
export class PublicDoctorComponent implements OnInit {

  public listDoctor: Array<Doctor> = [];
  specialists: Specialist[] = [];
  formData: FormGroup;
  pageNumber: number = null;
  constructor(
    private doctorService: DoctorService,
    private specialistService: SpecialistService
  ) {
  }

  ngOnInit() {
    this.doctorService.get10Object(1)
      .subscribe(data => {
        this.pageNumber = data["meta"]["last_page"];
        this.listDoctor = data["data"] as Doctor[];
        this.showPagination(this.pageNumber);
      }, (err) => { console.log(err) }
      )
    console.log(this.pageNumber);
  }

  getDoctor(page: number) {
    this.doctorService.get10Object(page)
      .subscribe(data => {
        this.listDoctor = data["data"] as Doctor[];
      }, (err) => { console.log(err) }
      )
  }

  showPagination(pages: number) {
    for (let i = 0; i < pages; i++) {
      $(".pagination").append("<li class='page-item'><a  (click)='ChangePage(" + i + ")'  class='page-link' rel='" + i + "'>" + (i + 1) + "</a></li>");
    }
    $(".pagination li:first").addClass("active");
    $("#prev").addClass("disable");
    if (pages == 1)
      $("#next").addClass("disable");
    else $("#next").removeClass("disable");
  }

  ChangePage(pageIndex: number) {
    if (pageIndex == 0) {
      $("#prev").addClass("disable");
    } else {
      $("#prev").removeClass("disable");
    }
    if (pageIndex == this.pageNumber - 1) {
      $("#next").addClass("disable");
    } else {
      $("#next").removeClass("disable");
    }
    this.getDoctor(pageIndex + 1);
    $(".pagination li").removeClass("active");
    $(".pagination li").eq(pageIndex).addClass("active");
  }
}
