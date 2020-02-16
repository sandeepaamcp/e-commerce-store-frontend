import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerdataComponent } from './carerdata.component';

describe('CarerdataComponent', () => {
  let component: CarerdataComponent;
  let fixture: ComponentFixture<CarerdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
