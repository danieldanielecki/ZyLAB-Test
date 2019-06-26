import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BooksComponent } from './books/books.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const booksRoutes: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      { path: '', component: BooksComponent },
      { path: 'new', component: BookEditComponent },
      { path: ':id', component: BookDetailComponent },
      { path: ':id/edit', component: BookEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(booksRoutes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
