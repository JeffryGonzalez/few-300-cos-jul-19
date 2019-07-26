import { createReducer, on } from '@ngrx/store';
import * as listActions from '../actions/list.actions';
export interface UiHintsState {
  listLoaded: boolean;
}

const initialState: UiHintsState = {
  listLoaded: false
};


const myreducer = createReducer(
  initialState,
  on(listActions.loadTodos, (state) => ({ listLoaded: false })),
  on(listActions.todosLoadedSuccessfully, (state) => ({ listLoaded: true }))
);

export function reducer(state: UiHintsState = initialState, action): UiHintsState {
  return myreducer(state, action);
}
