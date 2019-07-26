import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as filterActions from '../actions/filter.actions';

import { tap, map, filter, switchMap, catchError, concatMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FilterOptions } from '../reducers/filter.reducer';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TodoEntity } from '../reducers/list.reducer';

import * as listActions from '../actions/list.actions';

@Injectable()
export class FilterEffects {

  // deleteTodo = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(listActions.deleteTodo),
  //     concatMap(action => this.client.delete<{}>(environment.todosUrl + '/' + action.entity.id)
  //       .pipe(
  //         filter(x => false),
  //         catchError((err) => of(listActions.deleteTodoFailed({ entity: action.entity, message: err.error }))
  //         )
  //       )
  //     )
  //   );

  deleteTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.deleteTodo),
      concatMap(action => this.client.delete(environment.todosUrl + '/' + action.entity.id)
        .pipe(
          map(x => ({ type: 'NOOP' })),
          filter(x => false),
          catchError(x => of(listActions.deleteTodoFailed({ entity: action.entity, message: x.error })))
        )
      )
    )
  );


  clearAll = createEffect(() => {
    return this.actions$.pipe(
      ofType(listActions.clearCompleted),
      mergeMap(action => action.items.map(entity => listActions.deleteTodo({ entity })))
    );
  }, { dispatch: true });

  markComplete = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.todoItemCompleted),
      switchMap(action => this.client.put(
        environment.todosUrl + '/completed/' + action.item.id, action.item))
    ),
    { dispatch: false });

  saveTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.addTodoItem),
      concatMap(originalAction => this.client.post<TodoEntity>(environment.todosUrl, { description: originalAction.entity.description })
        .pipe(
          map(response => listActions.addTodoItemSucceeded({ oldId: originalAction.entity.id, entity: response })),
          catchError((err) =>
            of(listActions.addTodoItemFailed({ id: originalAction.entity.id, message: err.error })
            )
          )
        ))));


  loadTodos = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.loadTodos),
      switchMap(
        () => this.client.get<TodosResponse>(environment.todosUrl).pipe(
          map(r => r.data),
          map(todos => {
            const completedIds = todos.filter(t => t.completed).map(t => t.id);
            const todoEntities = todos.map(todo => ({
              id: todo.id,
              description: todo.description
            } as TodoEntity));
            return listActions.todosLoadedSuccessfully({ completedIds, todos: todoEntities });
          })
        )
      )
    ), { dispatch: true });


  loadFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterActions.loadFilter), // nothing, applicationStarted
      map(() => localStorage.getItem('filter')), // applicationStarted => the saved filter or null
      filter(f => f !== null), // stop here if there is nothing stored. nothign to see here. move along.
      map(f => f as FilterOptions), // f is a string, but I need a FilterOptions
      map(f => filterActions.setFilter({ filter: f })) // send a setFilter with that filter to the reducer
    )
  );

  saveFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(filterActions.setFilter),
      tap(a => localStorage.setItem('filter', a.filter))
    );
  }, { dispatch: false });

  constructor(private actions$: Actions, private client: HttpClient) { }
}


interface TodosResponse {
  data: { id: string, description: string, completed: boolean }[];
}
