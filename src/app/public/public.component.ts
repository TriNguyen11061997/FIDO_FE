import { Component, OnInit } from '@angular/core';
import { AddressService } from '@app/_services/address.service';
import { Address } from '@app/_models/address.model';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  addresses : Address[];
  constructor(
    private addressService : AddressService
  ) { }

  ngOnInit() {
    this.addressService.getAllObject().subscribe(
      data => {
        this.addresses = data as Address[]
      }
    )
  }

}
