import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAssignmentsCardComponent } from './family-assignments-card.component';

describe('FamilyAssignmentsCardComponent', () => {
  let component: FamilyAssignmentsCardComponent;
  let fixture: ComponentFixture<FamilyAssignmentsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyAssignmentsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAssignmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
