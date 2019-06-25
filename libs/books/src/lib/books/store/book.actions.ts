import { Action } from '@ngrx/store';
import { Book } from '../../book.model';

export const SET_BOOKS = 'SET_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const STORE_BOOKS = 'STORE_BOOKS';
export const FETCH_BOOKS = 'FETCH_BOOKS';

export class SetBooks implements Action {
  readonly type = SET_BOOKS;

  constructor(public payload: Book[]) {}
}

export class AddBook implements Action {
  readonly type = ADD_BOOK;

  constructor(public payload: Book) {}
}

export class UpdateBook implements Action {
  readonly type = UPDATE_BOOK;

  constructor(public payload: { index: number; updatedBook: Book }) {}
}

export class DeleteBook implements Action {
  readonly type = DELETE_BOOK;

  constructor(public payload: number) {}
}

export class StoreBooks implements Action {
  readonly type = STORE_BOOKS;
}

export class FetchBooks implements Action {
  readonly type = FETCH_BOOKS;
}

export type BookActions =
  | SetBooks
  | AddBook
  | UpdateBook
  | DeleteBook
  | StoreBooks
  | FetchBooks;
