import { authorReducer } from '@libs/authors/src/lib/authors/store/author.reducers';
import { bookReducer } from './books/store/book.reducers';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookEffects } from './books/store/book.effects';
import { BookListComponent } from './books/book-list/book-list.component';
import { BooksComponent } from './books/books.component';
import { BooksRoutingModule } from './books-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@libs/shared/src/index';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    BookDetailComponent,
    BookEditComponent,
    BookListComponent,
    BooksComponent
  ],
  imports: [
    BooksRoutingModule,
    EffectsModule.forFeature([BookEffects]),
    RouterModule.forChild([{ path: '', component: BooksComponent }]),
    SharedModule,
    StoreModule.forFeature('authors', authorReducer),
    StoreModule.forFeature('books', bookReducer)
  ]
})
export class BooksModule {}
