import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDoctorRatingComponent } from './public-doctor-rating.component';

describe('PublicDoctorRatingComponent', () => {
  let component: PublicDoctorRatingComponent;
  let fixture: ComponentFixture<PublicDoctorRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDoctorRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDoctorRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
