import { ListItemModel } from '.';
export interface FamilyAssignment {
  familyMember: {
    id: string;
    name: string;
  };
  complete: ListItemModel[];
  incomplete: ListItemModel[];
}
