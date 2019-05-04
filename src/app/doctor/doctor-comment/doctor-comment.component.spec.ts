import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCommentComponent } from './doctor-comment.component';

describe('DoctorCommentComponent', () => {
  let component: DoctorCommentComponent;
  let fixture: ComponentFixture<DoctorCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
