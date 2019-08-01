import { createAction, props } from '@ngrx/store';
import { FamilyEntity } from '../reducers/family.reducer';
let fakeId = 99;
export const addFamilyMember = createAction(
  '[todos feature] add family member',
  (name: string) => {
    const newItem: FamilyEntity = {
      id: 'F' + fakeId++,
      name
    };
    return { entity: newItem };
  }
);
