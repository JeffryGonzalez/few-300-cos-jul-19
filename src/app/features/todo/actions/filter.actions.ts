import { createAction, props } from '@ngrx/store';
import { FilterOptions } from '../reducers/filter.reducer';


export const setFilter = createAction(
  '[todosfeature] filter set',
  props<{ filter: FilterOptions }>()
);

export const setFilterText = createAction(
  '[todosfeature] filter text set',
  props<{ by: string }>()
);

export const loadFilter = createAction(
  '[todos feature] load filter'
);
