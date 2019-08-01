import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodosState } from '../../reducers';
import * as actions from '../../actions/family.actions';
@Component({
  selector: 'app-family-entry',
  templateUrl: './family-entry.component.html',
  styleUrls: ['./family-entry.component.scss']
})
export class FamilyEntryComponent implements OnInit {

  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
  }
  save(nameEl: HTMLInputElement) {
    this.store.dispatch(actions.addFamilyMember(nameEl.value));
    nameEl.value = '';
    nameEl.focus();
  }
}
