import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodosState } from '../../reducers';
import { addTodoItem } from '../../actions/list.actions';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
  }

  add(description: HTMLInputElement) {
    const desc = description.value;
    this.store.dispatch(addTodoItem(desc));
    description.value = '';
    description.focus();
  }
}
