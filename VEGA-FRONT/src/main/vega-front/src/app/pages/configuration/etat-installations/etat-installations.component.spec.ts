import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatInstallationsComponent } from './etat-installations.component';

describe('EtatInstallationsComponent', () => {
  let component: EtatInstallationsComponent;
  let fixture: ComponentFixture<EtatInstallationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatInstallationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
