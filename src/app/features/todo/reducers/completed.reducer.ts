import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/list.actions';
export interface CompletedState {
  ids: string[];
}

export const initialState: CompletedState = {
  ids: []
};

const myreducer = createReducer(
  initialState,
  on(actions.todoItemCompleted, (state, action) => {
    return {
      ids: [action.item.id, ...state.ids]
    };
  }),
  on(actions.clearCompleted, () => ({ ids: [] })),
  on(actions.todosLoadedSuccessfully, (state, action) => ({ ids: action.completedIds }))

);

export function reducer(state: CompletedState = initialState, action): CompletedState {
  return myreducer(state, action);
}
