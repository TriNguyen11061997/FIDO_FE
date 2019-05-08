import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Doctor } from '@app/_models/doctor.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Specialist } from '@app/_models/specialist.model';
import { SpecialistService } from '@app/_services/specialist.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressService } from '@app/_services/address.service';
import { Address } from '@app/_models/address.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-doctor',
  templateUrl: './public-doctor.component.html',
  styleUrls: ['./public-doctor.component.css']
})
export class PublicDoctorComponent implements OnInit {

  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  formSearch: FormGroup;
  listDoctor: Array<Doctor> = [];
  specialists: Specialist[] = [];
  formData: FormGroup;
  pageNumber: number = 0;
  currentPage: number = 0;
  addresses: Address[] = []
  constructor(
    private doctorService: DoctorService,
    private addressService: AddressService,
    private specialistService: SpecialistService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      specialist_id: [""],
      address_id: [""],
      name: []
    })
    if (this.doctorService.address_id != null || this.doctorService.name != null) {
      const formData = new FormData();
      this.formSearch.patchValue({
        address_id: this.doctorService.address_id,
        name: this.doctorService.name
      })
      this.onSearch();
    } else {
      this.doctorService.get10Object(1)
        .subscribe(data => {
          this.pageNumber = data["meta"]["last_page"] as number;
          this.listDoctor = data["data"] as Doctor[];
          this.showPagination(this.pageNumber);
        }
        )
    }
    this.addressService.getAllObject().subscribe(
      data => {
        this.addresses = data as Address[]
      });
    this.specialistService.getAllObject().subscribe(
      data => {
        this.specialists = data as Specialist[];
      }
    )
  }

  onSearch() {
    this.doctorService.search(this.formSearch.value).subscribe(
      data => {
        this.pageNumber = data["meta"]["last_page"] as number;
        this.listDoctor = data["data"] as Doctor[];
        this.showPagination(this.pageNumber);
      }
    )
  }

  OnclickCK(id: number) {
    this.formSearch.patchValue({
      specialist_id : id
    })
    this.doctorService.search(this.formSearch.value).subscribe(
      data => {
        this.pageNumber = data["meta"]["last_page"] as number;
        this.listDoctor = data["data"] as Doctor[];
        this.showPagination(this.pageNumber);
      }
    )
  }

  onNext() {
    this.currentPage += 1;
    this.ChangePage(this.currentPage);
  }

  onPrev() {
    this.currentPage -= 1;
    this.ChangePage(this.currentPage);
  }

  getDoctor(page: number) {
    this.doctorService.get10Object(page)
      .subscribe(data => {
        this.listDoctor = data["data"] as Doctor[];
      }, (err) => { console.log(err) }
      )
  }

  showPagination(pages: number) {
    $(".pagination").html("")
    for (let i = 0; i < pages; i++) {
      $(".pagination").append("<li (click)=" + "onClick() " + " class='page-item'><a class='page-link' rel='" + i + "'>" + (i + 1) + "</a></li>");
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
