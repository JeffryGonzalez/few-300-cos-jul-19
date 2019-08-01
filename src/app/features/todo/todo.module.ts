import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './components/entry/entry.component';
import { ListComponent } from './components/list/list.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './reducers';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { EffectsModule } from '@ngrx/effects';
import { FilterEffects } from './effects/filter.effects';
import { HttpClientModule } from '@angular/common/http';
import { AppEffects } from './effects/app.effects';
import { FamilyEntryComponent } from './components/family-entry/family-entry.component';
import { FamilyAssignmentsComponent } from './components/family-assignments/family-assignments.component';
import { FamilyAssignmentsCardComponent } from './components/family-assignments-card/family-assignments-card.component';

const routes: Routes = [
  {
    path: 'todo-list',
    component: TodoComponent,
    children: [
      {
        path: 'entry',
        component: EntryComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'family-entry',
        component: FamilyEntryComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  declarations: [
    FamilyEntryComponent,
    TodoComponent,
    EntryComponent,
    ListComponent,
    FamilyAssignmentsComponent,
    FilterBarComponent,
    FamilyAssignmentsCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([AppEffects, FilterEffects]),
    HttpClientModule
  ]
})
export class TodoModule { }
