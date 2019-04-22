import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorFormComponent } from './admin-doctor-form.component';

describe('AdminDoctorFormComponent', () => {
  let component: AdminDoctorFormComponent;
  let fixture: ComponentFixture<AdminDoctorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDoctorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDoctorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
