import { Actions, Effect, ofType } from '@ngrx/effects';
import { Book } from '../../book.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as BookActions from './book.actions';
import * as fromBook from './book.reducers';

@Injectable()
export class BookEffects {
  @Effect()
  bookFetch = this.actions$.pipe(
    ofType(BookActions.FETCH_BOOKS),
    switchMap((action: BookActions.FetchBooks) => {
      return this.httpClient.get<Book[]>(
        'https://zylab-dev.firebaseio.com/books.json',
        {
          observe: 'body',
          responseType: 'json'
        }
      );
    }),
    map(books => {
      console.log(books); // TODO: Comment for production.
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
      const req = new HttpRequest(
        'PUT',
        'https://zylab-dev.firebaseio.com/books.json',
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
