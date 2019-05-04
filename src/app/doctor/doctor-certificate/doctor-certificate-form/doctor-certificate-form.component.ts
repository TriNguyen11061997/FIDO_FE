import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from '@app/_services/certificate.service';
import { AuthenticationService } from '@app/_services';
import { Users } from '@app/_models/users.model';

@Component({
  selector: 'app-doctor-certificate-form',
  templateUrl: './doctor-certificate-form.component.html',
  styleUrls: ['./doctor-certificate-form.component.css']
})
export class DoctorCertificateFormComponent implements OnInit {

  currentUser: Users;
  idDoctor: number;
  fileAvatar: File = null;
  constructor(
    private certificateService: CertificateService,
    private userService: AuthenticationService,
    private toastr: ToastrService) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user });
    this.idDoctor = this.currentUser.usable_id;
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    this.fileAvatar = null;
    if (form != null)
      form.resetForm();
    this.certificateService.formData = {
      id: null,
      name: '',
      description: '',
      image: '',
      doctor_id: this.idDoctor
    }
  }


  onSubmit(form: NgForm) {
    if (form.value.id == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.fileAvatar = <File>event.target.files[0];
    }
  }

  insertRecord(form: NgForm) {
    const formData = new FormData();
    formData.append('image', this.fileAvatar);
    formData.append('id', form.value.id);
    formData.append('name', form.value.name);
    formData.append('description', form.value.description);
    formData.append('doctor_id', form.value.doctor_id);
    this.certificateService.add(formData).subscribe(
      res => {
        if (res["status_code"] == 201) {
          this.toastr.success('Thêm mới thành công', 'FIDO!');
          this.resetForm(form);
          this.certificateService.getAllObject(this.idDoctor);
        }
        else
          this.toastr.warning('Vui lòng chọn ảnh', 'FIDO!');
      }, (err) => { this.toastr.success(err); }
    );
  }

  updateRecord(form: NgForm) {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    if(this.fileAvatar){
      formData.append('image', this.fileAvatar);
    }
    formData.append('id', form.value.id);
    formData.append('name', form.value.name);
    formData.append('description', form.value.description);
    formData.append('doctor_id', form.value.doctor_id);
    this.certificateService.update(formData).subscribe(
      res => {
        if (res["status_code"] == 201) {
          this.toastr.success('Cập nhật thành thành công', 'FIDO!');
          this.resetForm(form);
          this.certificateService.getAllObject(this.idDoctor);
        }
        else
          this.toastr.warning('Vui lòng chọn ảnh', 'FIDO!');
      }, (err) => { this.toastr.error(err); }
    );

  }
}
