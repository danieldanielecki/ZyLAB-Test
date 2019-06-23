import { BooksComponent } from './books/books.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@libs/shared/src/index';

@NgModule({
  declarations: [BooksComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: BooksComponent }]),
    SharedModule
  ]
})
export class BooksModule {}
