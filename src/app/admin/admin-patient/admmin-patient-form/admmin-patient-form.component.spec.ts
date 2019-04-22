import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmminPatientFormComponent } from './admmin-patient-form.component';

describe('AdmminPatientFormComponent', () => {
  let component: AdmminPatientFormComponent;
  let fixture: ComponentFixture<AdmminPatientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmminPatientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmminPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
