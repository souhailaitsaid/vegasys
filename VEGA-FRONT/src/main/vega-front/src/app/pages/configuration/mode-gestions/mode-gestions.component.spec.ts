import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeGestionsComponent } from './mode-gestions.component';

describe('ModeGestionsComponent', () => {
  let component: ModeGestionsComponent;
  let fixture: ComponentFixture<ModeGestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeGestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeGestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
