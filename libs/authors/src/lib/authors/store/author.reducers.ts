import { Author } from '../../author.model';
import * as AuthorActions from './author.actions';

export interface FeatureState {
  authors: State;
}

export interface State {
  authors: Author[];
}

// Initial authors data.
const initialState: State = {
  authors: [
    new Author('James Baldwin', 1969),
    new Author('Katherine Dunn', 1942),
    new Author('Vladimir Nabokov', 1913),
    new Author('David Foster Wallace', 1955),
    new Author('Italo Calvino', 1986),
    new Author('Edward Abbey', 1975)
  ]
};

// Core logic for authors manipulation.
export function authorReducer(
  state = initialState,
  action: AuthorActions.AuthorActions
) {
  switch (action.type) {
    case AuthorActions.SET_AUTHORS:
      return {
        ...state,
        authors: [...action.payload]
      };
    case AuthorActions.ADD_AUTHOR:
      return {
        ...state,
        authors: [...state.authors, action.payload]
      };
    case AuthorActions.UPDATE_AUTHOR:
      const author = state.authors[action.payload.index];
      const updatedAuthor = {
        ...author,
        ...action.payload.updatedAuthor
      };
      const authors = [...state.authors];
      authors[action.payload.index] = updatedAuthor;
      return {
        ...state,
        authors: authors
      };
    case AuthorActions.DELETE_AUTHOR:
      const oldAuthors = [...state.authors];
      oldAuthors.splice(action.payload, 1);
      return {
        ...state,
        authors: oldAuthors
      };
    default:
      return state;
  }
}
