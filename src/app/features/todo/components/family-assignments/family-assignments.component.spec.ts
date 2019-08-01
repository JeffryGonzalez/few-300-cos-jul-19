import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAssignmentsComponent } from './family-assignments.component';

describe('FamilyAssignmentsComponent', () => {
  let component: FamilyAssignmentsComponent;
  let fixture: ComponentFixture<FamilyAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
