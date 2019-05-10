import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResetpassComponent } from './admin-resetpass.component';

describe('AdminResetpassComponent', () => {
  let component: AdminResetpassComponent;
  let fixture: ComponentFixture<AdminResetpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResetpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
