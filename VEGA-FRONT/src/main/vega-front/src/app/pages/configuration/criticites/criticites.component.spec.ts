import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticitesComponent } from './criticites.component';

describe('CriticitesComponent', () => {
  let component: CriticitesComponent;
  let fixture: ComponentFixture<CriticitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
