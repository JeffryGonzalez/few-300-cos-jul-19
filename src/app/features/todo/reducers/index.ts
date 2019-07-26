export const featureName = 'todosFeature';
import * as fromList from './list.reducer';
import * as fromCompleted from './completed.reducer';
import * as fromFilter from './filter.reducer';
import * as fromUiHints from './ui-hints.reducer';

import * as models from '../models';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface TodosState {
  list: fromList.TodoListState;
  completed: fromCompleted.CompletedState;
  filter: fromFilter.FilterState;
  ui: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<TodosState> = {
  list: fromList.reducer,
  completed: fromCompleted.reducer,
  filter: fromFilter.reducer,
  ui: fromUiHints.reducer
};


// 1. Create A Feature Selector
const selectTodosFeatures = createFeatureSelector<TodosState>(featureName);
// 2. Create a selector for each branch of the feature
const selectListBranch = createSelector(selectTodosFeatures, f => f.list);
const selectCompletedBranch = createSelector(selectTodosFeatures, f => f.completed);
const selectFilterBranch = createSelector(selectTodosFeatures, f => f.filter);
const selectUiHints = createSelector(selectTodosFeatures, f => f.ui);
// 3. Any "helpers"
const { selectAll: selectAllTodoEntity } = fromList.adapter.getSelectors(selectListBranch);
const selectCompletedIds = createSelector(selectCompletedBranch, b => b.ids);
const selectFilterText = createSelector(selectFilterBranch, b => b.filterText);
// 4. Exported Selectors for the components

export const selectFeatureLoaded = createSelector(selectUiHints, h => h.listLoaded);

export const selectCurrentFilter = createSelector(selectFilterBranch, f => f.listFilter);
// TODO: return a selector of a

// We need a selector that returns a TodoListItemModel[]
export const selectUnfilteredTodoList = createSelector(
  selectAllTodoEntity,
  selectCompletedIds,
  (todos, completed) => todos.map(todo => {
    return {
      id: todo.id,
      description: todo.description,
      completed: completed.some(id => id === todo.id),
      isTemp: todo.id.startsWith('F')
    } as models.ListItemModel;
  }));

const selectTodoListBeforeSearch = createSelector(
  selectUnfilteredTodoList,
  selectCurrentFilter,
  (todos, filterOption) => {
    if (filterOption === 'all') {
      return todos;
    }
    if (filterOption === 'complete') {
      return todos.filter(t => t.completed === true);
    }
    if (filterOption === 'incomplete') {
      return todos.filter(t => t.completed === false);
    }
  });


export const selectTodoList = createSelector(
  selectTodoListBeforeSearch,
  selectFilterText,
  (todos, filter) => {
    const re = new RegExp(filter, 'i');
    return filter === '' ? todos : todos.filter(todo => todo.description.match(re));
  }
);
