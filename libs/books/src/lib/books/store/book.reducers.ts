import { Book } from '../../book.model';
import * as BookActions from './book.actions';

export interface FeatureState {
  books: State;
}

export interface State {
  books: Book[];
}

// Initial books data.
const initialState: State = {
  books: [
    new Book(1969, "giovanni's room", 1, 'Ablex Publishing'),
    new Book(1913, 'desert solitaire', 2, 'Berkley Books'),
    new Book(1942, 'geek love', 2, 'Constable & Co Ltd'),
    new Book(1955, 'lolita', 3, 'Crocker & Brewster'),
    new Book(
      2007,
      'A Good Man Is Hard to Find and Other Stories',
      3,
      'Hay House'
    ),
    new Book(2009, "if on a Winter's Night a Traveler", 2, 'Myriad Editions'),
    new Book(2013, 'infinite jest', 1, "O'Reilly Media")
  ]
};

// Core logic for books manipulation.
export function bookReducer(
  state = initialState,
  action: BookActions.BookActions
) {
  switch (action.type) {
    case BookActions.SET_BOOKS:
      return {
        ...state,
        books: [...action.payload]
      };
    case BookActions.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload]
      };
    case BookActions.UPDATE_BOOK:
      const book = state.books[action.payload.index];
      const updatedBook = {
        ...book,
        ...action.payload.updatedBook
      };
      const books = [...state.books];
      books[action.payload.index] = updatedBook;
      return {
        ...state,
        books: books
      };
    case BookActions.DELETE_BOOK:
      const oldBooks = [...state.books];
      oldBooks.splice(action.payload, 1);
      return {
        ...state,
        books: oldBooks
      };
    default:
      return state;
  }
}
