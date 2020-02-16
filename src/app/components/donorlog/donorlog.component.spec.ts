import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorlogComponent } from './donorlog.component';

describe('DonorlogComponent', () => {
  let component: DonorlogComponent;
  let fixture: ComponentFixture<DonorlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
