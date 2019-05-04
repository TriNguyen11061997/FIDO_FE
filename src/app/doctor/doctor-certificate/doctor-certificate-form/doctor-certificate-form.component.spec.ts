import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCertificateFormComponent } from './doctor-certificate-form.component';

describe('DoctorCertificateFormComponent', () => {
  let component: DoctorCertificateFormComponent;
  let fixture: ComponentFixture<DoctorCertificateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCertificateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCertificateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
