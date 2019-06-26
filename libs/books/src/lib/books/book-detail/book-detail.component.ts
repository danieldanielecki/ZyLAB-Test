import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as BookActions from '../store/book.actions';
import * as fromBook from '../store/book.reducers';

@Component({
  selector: 'app-books-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  bookState: Observable<fromBook.State>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromBook.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.bookState = this.store.select('books');
    });
  }

  onEditBook() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteBook() {
    this.store.dispatch(new BookActions.DeleteBook(this.id));
    this.router.navigate(['/books']);
  }
}
