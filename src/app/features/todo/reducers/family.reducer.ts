import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/family.actions';
export interface FamilyEntity {
  id: string;
  name: string;
}

export interface FamilyState extends EntityState<FamilyEntity> { }

export const adapter = createEntityAdapter<FamilyEntity>();

export const initialState: FamilyState = {
  ids: ['1', '2'],
  entities: {
    1: { id: '1', name: 'Henry' },
    2: { id: '2', name: 'Violet' }
  }
};

const familyReducer = createReducer(
  initialState,
  on(actions.addFamilyMember, (state, action) => adapter.addOne(action.entity, state))
);

export function reducer(state, action) {
  return familyReducer(state, action);
}
