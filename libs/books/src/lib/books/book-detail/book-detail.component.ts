import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as BookActions from '../store/book.actions';
import * as fromAuthor from '@libs/authors/src/lib/authors/store/author.reducers';
import * as fromBook from '../store/book.reducers';

@Component({
  selector: 'app-books-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  public authorState: Observable<fromAuthor.State>;
  public bookState: Observable<fromBook.State>;
  public id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeAuthors: Store<fromAuthor.FeatureState>,
    private storeBooks: Store<fromBook.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.authorState = this.storeAuthors.select('authors');
      this.bookState = this.storeBooks.select('books');
    });
  }

  onEditBook() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteBook() {
    this.storeBooks.dispatch(new BookActions.DeleteBook(this.id));
    this.router.navigate(['/books']);
  }
}
