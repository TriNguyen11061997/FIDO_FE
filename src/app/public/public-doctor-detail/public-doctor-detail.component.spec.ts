import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDoctorDetailComponent } from './public-doctor-detail.component';

describe('PublicDoctorDetailComponent', () => {
  let component: PublicDoctorDetailComponent;
  let fixture: ComponentFixture<PublicDoctorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDoctorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDoctorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
