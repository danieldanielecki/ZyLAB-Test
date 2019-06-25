import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthorActions from './author.actions';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Author } from '../../author.model';
import { Injectable } from '@angular/core';
import * as fromAuthor from './author.reducers';

@Injectable()
export class AuthorEffects {
  @Effect()
  authorFetch = this.actions$.pipe(
    ofType(AuthorActions.FETCH_AUTHORS),
    switchMap((action: AuthorActions.FetchAuthors) => {
      // TODO: Change this URL.
      return this.httpClient.get<Author[]>(
        'https://ng-recipe-book-1a5ac.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json'
        }
      );
    }),
    map(authors => {
      console.log(authors);
      return {
        type: AuthorActions.SET_AUTHORS,
        payload: authors
      };
    })
  );

  @Effect({ dispatch: false }) // We don't want to do anything after this, so dispatch: false.
  authorStore = this.actions$.pipe(
    ofType(AuthorActions.STORE_AUTHORS),
    withLatestFrom(this.store.select('authors')),
    switchMap(([action, state]) => {
      // TODO: Change this URL.
      const req = new HttpRequest(
        'PUT',
        'https://ng-recipe-book-1a5ac.firebaseio.com/recipes.json',
        state.authors,
        { reportProgress: true }
      );
      return this.httpClient.request(req);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromAuthor.FeatureState>
  ) {}
}
