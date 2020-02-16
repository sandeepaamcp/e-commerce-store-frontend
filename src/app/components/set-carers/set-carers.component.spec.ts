import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCarersComponent } from './set-carers.component';

describe('SetCarersComponent', () => {
  let component: SetCarersComponent;
  let fixture: ComponentFixture<SetCarersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCarersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCarersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
