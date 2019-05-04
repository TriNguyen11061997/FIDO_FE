import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCertificateComponent } from './doctor-certificate.component';

describe('DoctorCertificateComponent', () => {
  let component: DoctorCertificateComponent;
  let fixture: ComponentFixture<DoctorCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
