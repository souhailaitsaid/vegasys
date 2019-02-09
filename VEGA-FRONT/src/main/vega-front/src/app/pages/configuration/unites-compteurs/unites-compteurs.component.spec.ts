import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitesCompteursComponent } from './unites-compteurs.component';

describe('UnitesCompteursComponent', () => {
  let component: UnitesCompteursComponent;
  let fixture: ComponentFixture<UnitesCompteursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitesCompteursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitesCompteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
