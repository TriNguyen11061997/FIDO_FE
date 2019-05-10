import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorResetpassComponent } from './doctor-resetpass.component';

describe('DoctorResetpassComponent', () => {
  let component: DoctorResetpassComponent;
  let fixture: ComponentFixture<DoctorResetpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorResetpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorResetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
