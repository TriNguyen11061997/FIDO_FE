import { Component, OnInit } from '@angular/core';
import { Aq } from '@app/_models/aq.model';
import { AqService } from '@app/_services/aq.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/_services';
import { Users } from '@app/_models/users.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-aq-form',
  templateUrl: './doctor-aq-form.component.html',
  styleUrls: ['./doctor-aq-form.component.css']
})
export class DoctorAqFormComponent implements OnInit {

  aq : Aq;
  doctor_id : number;
  aqForm : FormGroup
  constructor(
    private aqService: AqService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService,
    private userService : AuthenticationService,
    private formBuilder: FormBuilder,
  ) { 
    this.userService.currentUser.subscribe(x=>{this.doctor_id = x.usable_id})
  }

  ngOnInit() {
    this.spinner.show()
    this.aqService.getObjectByID(this.route.snapshot.params['id'],this.doctor_id).subscribe(
      data => {
        this.spinner.hide()
        this.aq = data as Aq
        this.aqForm.patchValue({
          id: this.aq.id,
          question_content : this.aq.question_content,
          answer: this.aq.answer,
          patient_name : this.aq.patient_name,
          patient_id : this.aq.patient_id,
          doctor_id : this.aq.doctor_id,
          patient_address_name : this.aq.patient_address_name,
          patient_age : this.aq.patient_age
        })
      }
      ,(err)=>{this.spinner.hide()}
    )
      this.aqForm = this.formBuilder.group({
        id : null,
        doctor_id : null,
        patient_id : null,
        question_content:null,
        answer: [null,Validators],
        patient_name : null,
        patient_address_name : null,
        patient_age : null,
        _method : ['PUT']
      })
  }
  get f() { return this.aqForm.controls; }
  onSubmit(){
    if (this.aqForm.invalid) {
      return;
    }
    this.aqService.update(this.aqForm.value).subscribe(
      data =>{
        this.toastr.success("Cập nhật thành công","FIDO!")
        this.router.navigate(['/doctor/aq']);
      },
      (err)=>{
        this.toastr.warning("Cập nhật không thành công","FIDO!")
      }
    )
  }
}
