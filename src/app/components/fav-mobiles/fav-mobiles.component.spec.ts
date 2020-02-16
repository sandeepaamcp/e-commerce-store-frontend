import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavMobilesComponent } from './fav-mobiles.component';

describe('FavMobilesComponent', () => {
  let component: FavMobilesComponent;
  let fixture: ComponentFixture<FavMobilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavMobilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavMobilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
