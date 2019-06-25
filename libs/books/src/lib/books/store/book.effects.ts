import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as BookActions from './book.actions';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Book } from '../../book.model';
import { Injectable } from '@angular/core';
import * as fromBook from './book.reducers';

@Injectable()
export class BookEffects {
  @Effect()
  bookFetch = this.actions$.pipe(
    ofType(BookActions.FETCH_BOOKS),
    switchMap((action: BookActions.FetchBooks) => {
      // TODO: Change this URL.
      return this.httpClient.get<Book[]>(
        'https://ng-recipe-book-1a5ac.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json'
        }
      );
    }),
    map(books => {
      console.log(books);
      return {
        type: BookActions.SET_BOOKS,
        payload: books
      };
    })
  );

  @Effect({ dispatch: false }) // We don't want to do anything after this, so dispatch: false.
  bookStore = this.actions$.pipe(
    ofType(BookActions.STORE_BOOKS),
    withLatestFrom(this.store.select('books')),
    switchMap(([action, state]) => {
      // TODO: Change this URL.
      const req = new HttpRequest(
        'PUT',
        'https://ng-recipe-book-1a5ac.firebaseio.com/recipes.json',
        state.books,
        { reportProgress: true }
      );
      return this.httpClient.request(req);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromBook.FeatureState>
  ) {}
}
