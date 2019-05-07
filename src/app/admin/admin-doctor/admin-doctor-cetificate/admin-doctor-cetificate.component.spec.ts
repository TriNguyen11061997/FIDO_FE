import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorCetificateComponent } from './admin-doctor-cetificate.component';

describe('AdminDoctorCetificateComponent', () => {
  let component: AdminDoctorCetificateComponent;
  let fixture: ComponentFixture<AdminDoctorCetificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDoctorCetificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDoctorCetificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
