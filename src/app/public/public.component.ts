import { Component, OnInit } from '@angular/core';
import { AddressService } from '@app/_services/address.service';
import { Address } from '@app/_models/address.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '@app/_services/doctor.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  formSearch: FormGroup;
  addresses: Address[];
  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private router: Router,
    private doctorService : DoctorService
  ) { }

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      address_id: [""],
      name: [""]
    })
    this.addressService.getAllObject().subscribe(
      data => {
        this.addresses = data as Address[]
      }
    )
  }
  onSearch() {
    this.doctorService.address_id = this.formSearch.get("address_id").value;
    this.doctorService.name = this.formSearch.get("name").value;
    this.router.navigate(['/public/doctor']);
  }

}
