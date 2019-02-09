import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEquipementsComponent } from './type-equipements.component';

describe('TypeEquipementsComponent', () => {
  let component: TypeEquipementsComponent;
  let fixture: ComponentFixture<TypeEquipementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEquipementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEquipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
