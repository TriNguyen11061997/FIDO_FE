import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSickComponent } from './public-sick.component';

describe('PublicSickComponent', () => {
  let component: PublicSickComponent;
  let fixture: ComponentFixture<PublicSickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
