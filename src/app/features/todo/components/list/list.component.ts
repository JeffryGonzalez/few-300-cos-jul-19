import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListItemModel } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodosState, selectTodoList, selectCurrentFilter } from '../../reducers';
import { TodoEntity } from '../../reducers/list.reducer';
import { todoItemCompleted, clearCompleted } from '../../actions/list.actions';
import { FilterOptions } from '../../reducers/filter.reducer';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  model$: Observable<ListItemModel[]>;
  currentFilter$: Observable<FilterOptions>;
  subscription: Subscription;
  completedItems: ListItemModel[];

  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
    this.currentFilter$ = this.store.select(selectCurrentFilter);
    this.model$ = this.store.select(selectTodoList);
    this.subscription = this.model$.subscribe(items => {
      console.log(items.length);
      this.completedItems = items.filter(i => i.completed);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  markComplete(item: TodoEntity) {
    this.store.dispatch(todoItemCompleted({ item }));
  }

  removeCompleted() {
    this.store.dispatch(clearCompleted({ items: this.completedItems }));
  }
}
