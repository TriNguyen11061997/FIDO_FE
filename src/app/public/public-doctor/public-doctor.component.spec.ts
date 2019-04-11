import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDoctorComponent } from './public-doctor.component';

describe('PublicDoctorComponent', () => {
  let component: PublicDoctorComponent;
  let fixture: ComponentFixture<PublicDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
