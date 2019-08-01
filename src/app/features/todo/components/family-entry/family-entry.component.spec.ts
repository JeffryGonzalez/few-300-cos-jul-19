import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyEntryComponent } from './family-entry.component';

describe('FamilyEntryComponent', () => {
  let component: FamilyEntryComponent;
  let fixture: ComponentFixture<FamilyEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
