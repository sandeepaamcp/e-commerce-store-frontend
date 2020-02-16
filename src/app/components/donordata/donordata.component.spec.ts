import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonordataComponent } from './donordata.component';

describe('DonordataComponent', () => {
  let component: DonordataComponent;
  let fixture: ComponentFixture<DonordataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonordataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonordataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
