import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicViewInfoComponent } from './public-view-info.component';

describe('PublicViewInfoComponent', () => {
  let component: PublicViewInfoComponent;
  let fixture: ComponentFixture<PublicViewInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicViewInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
