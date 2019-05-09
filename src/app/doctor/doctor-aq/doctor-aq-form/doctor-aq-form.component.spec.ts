import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAqFormComponent } from './doctor-aq-form.component';

describe('DoctorAqFormComponent', () => {
  let component: DoctorAqFormComponent;
  let fixture: ComponentFixture<DoctorAqFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAqFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
