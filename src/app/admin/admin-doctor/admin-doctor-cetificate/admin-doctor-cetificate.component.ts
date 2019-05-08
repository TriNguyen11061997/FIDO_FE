import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CertificateService } from '@app/_services/certificate.service';
import { AuthenticationService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';
import { Users } from '@app/_models/users.model';
import { Certificate } from '@app/_models/certificate.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-doctor-cetificate',
  templateUrl: './admin-doctor-cetificate.component.html',
  styleUrls: ['./admin-doctor-cetificate.component.css']
})
export class AdminDoctorCetificateComponent implements OnInit {

  currentUser: Users;
  idDoctor: number;
  fileAvatar: File = null;
  constructor(
    private certificateService: CertificateService,
    private userService: AuthenticationService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.userService.currentUser.subscribe(user => { this.currentUser = user });
  }

  ngOnInit() {
    this.idDoctor = this.route.snapshot.params['id'];
    this.certificateService.getAllObject(this.idDoctor);
    this.resetForm();
  }

  populateForm(emp: Certificate) {
    this.certificateService.formData = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      this.certificateService.delete(id, this.idDoctor).subscribe(res => {
        this.certificateService.getAllObject(this.idDoctor);
        this.toastr.success('Deleted successfully', 'FIDO said!');
      });
    }
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
      doctor_id: this.idDoctor,
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
    formData.append('name', form.value.name);
    formData.append('description', form.value.description);
    formData.append('doctor_id', this.idDoctor.toString());
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
    if (this.fileAvatar) {
      formData.append('image', this.fileAvatar);
    }
    formData.append('id', form.value.id);
    formData.append('name', form.value.name);
    formData.append('description', form.value.description);
    formData.append('doctor_id', this.idDoctor.toString());
    this.certificateService.update(formData).subscribe(
      res => {
        if (res["status_code"] == 201) {
          this.toastr.success('Cập nhật thành công', 'FIDO!');
          this.resetForm(form);
          this.certificateService.getAllObject(this.idDoctor);
        }
        else
          this.toastr.warning('Vui lòng chọn ảnh', 'FIDO!');
      }, (err) => { this.toastr.error(err); }
    );

  }
}
