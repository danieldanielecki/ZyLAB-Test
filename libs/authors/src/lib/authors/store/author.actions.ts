import { Action } from '@ngrx/store';
import { Author } from '../../author.model';

export const SET_AUTHORS = 'SET_AUTHORS';
export const ADD_AUTHOR = 'ADD_AUTHOR';
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR';
export const DELETE_AUTHOR = 'DELETE_AUTHOR';
export const STORE_AUTHORS = 'STORE_AUTHORS';
export const FETCH_AUTHORS = 'FETCH_AUTHORS';

export class SetAuthors implements Action {
  readonly type = SET_AUTHORS;

  constructor(public payload: Author[]) {}
}

export class AddAuthor implements Action {
  readonly type = ADD_AUTHOR;

  constructor(public payload: Author) {}
}

export class UpdateAuthor implements Action {
  readonly type = UPDATE_AUTHOR;

  constructor(public payload: { index: number; updatedAuthor: Author }) {}
}

export class DeleteAuthor implements Action {
  readonly type = DELETE_AUTHOR;

  constructor(public payload: number) {}
}

export class StoreAuthors implements Action {
  readonly type = STORE_AUTHORS;
}

export class FetchAuthors implements Action {
  readonly type = FETCH_AUTHORS;
}

export type AuthorActions =
  | SetAuthors
  | AddAuthor
  | UpdateAuthor
  | DeleteAuthor
  | StoreAuthors
  | FetchAuthors;
