import { Author } from '../../author.model';
import * as AuthorActions from './author.actions';

export interface FeatureState {
  authors: State;
}

export interface State {
  authors: Author[];
}

const initialState: State = {
  authors: [
    new Author(1, 'James Baldwin', 1969),
    new Author(2, 'Katherine Dunn', 1942),
    new Author(3, 'Vladimir Nabokov', 1913),
    new Author(4, 'David Foster Wallace', 1955),
    new Author(5, 'Italo Calvino', 1986),
    new Author(6, 'Edward Abbey', 1975)
  ]
};

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
