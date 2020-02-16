import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndmarketingComponent } from './endmarketing.component';

describe('EndmarketingComponent', () => {
  let component: EndmarketingComponent;
  let fixture: ComponentFixture<EndmarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndmarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndmarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
