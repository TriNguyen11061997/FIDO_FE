import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAqComponent } from './doctor-aq.component';

describe('DoctorAqComponent', () => {
  let component: DoctorAqComponent;
  let fixture: ComponentFixture<DoctorAqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
