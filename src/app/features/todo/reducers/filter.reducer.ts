import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/filter.actions';
export type FilterOptions = 'all' | 'incomplete' | 'complete';
import { tassign } from 'tassign';
export interface FilterState {
  listFilter: FilterOptions;
  filterText: string;
}

export const initialState: FilterState = {
  listFilter: 'all',
  filterText: ''
};

export const reducer = createReducer(
  initialState,
  on(actions.setFilter, (state, action) => tassign(state, { listFilter: action.filter })),
  on(actions.setFilterText, (state, action) => tassign(state, { filterText: action.by }))
);
