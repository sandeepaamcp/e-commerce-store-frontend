import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerlogComponent } from './carerlog.component';

describe('CarerlogComponent', () => {
  let component: CarerlogComponent;
  let fixture: ComponentFixture<CarerlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
