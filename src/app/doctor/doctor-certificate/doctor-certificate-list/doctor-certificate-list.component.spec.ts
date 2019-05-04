import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCertificateListComponent } from './doctor-certificate-list.component';

describe('DoctorCertificateListComponent', () => {
  let component: DoctorCertificateListComponent;
  let fixture: ComponentFixture<DoctorCertificateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCertificateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCertificateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
