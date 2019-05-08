import { Component, OnInit } from '@angular/core';
import { CertificateService } from '@app/_services/certificate.service';
import { ToastrService } from 'ngx-toastr';
import { Users } from '@app/_models/users.model';
import { AuthenticationService } from '@app/_services';
import { Certificate } from '@app/_models/certificate.model';


@Component({
  selector: 'app-doctor-certificate-list',
  templateUrl: './doctor-certificate-list.component.html',
  styleUrls: ['./doctor-certificate-list.component.css']
})
export class DoctorCertificateListComponent implements OnInit {
  idDoctor : number;
  currentUser : Users;
  constructor(
    public certificateService: CertificateService,
    private userService : AuthenticationService,
    private toastr: ToastrService) {
       this.userService.currentUser.subscribe(user =>{this.currentUser = user});
       this.idDoctor = this.currentUser.usable_id;
    }

  ngOnInit() {
    this.certificateService.getAllObject(this.idDoctor);
  }

  populateForm(emp: Certificate) {
    this.certificateService.formData = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      this.certificateService.delete(id,this.idDoctor).subscribe(res => {
        this.certificateService.getAllObject(this.idDoctor);
        this.toastr.success('Deleted successfully', 'FIDO said!');
      });
    }
  }

}
