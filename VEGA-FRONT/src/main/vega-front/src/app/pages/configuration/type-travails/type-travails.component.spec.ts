import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTravailsComponent } from './type-travails.component';

describe('TypeTravailsComponent', () => {
  let component: TypeTravailsComponent;
  let fixture: ComponentFixture<TypeTravailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeTravailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTravailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
