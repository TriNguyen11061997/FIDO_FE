import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeFormComponent } from './admin-employee-form.component';

describe('AdminEmployeeFormComponent', () => {
  let component: AdminEmployeeFormComponent;
  let fixture: ComponentFixture<AdminEmployeeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
