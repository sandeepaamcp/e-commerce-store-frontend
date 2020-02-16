import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSpecComponent } from './mobile-spec.component';

describe('MobileSpecComponent', () => {
  let component: MobileSpecComponent;
  let fixture: ComponentFixture<MobileSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
