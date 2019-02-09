import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutDemandeTravailsComponent } from './statut-demande-travails.component';

describe('StatutDemandeTravailsComponent', () => {
  let component: StatutDemandeTravailsComponent;
  let fixture: ComponentFixture<StatutDemandeTravailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutDemandeTravailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutDemandeTravailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
