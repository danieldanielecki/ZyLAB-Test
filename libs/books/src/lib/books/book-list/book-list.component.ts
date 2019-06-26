import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromBook from '../store/book.reducers';

@Component({
  selector: 'app-books-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  bookState: Observable<fromBook.State>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromBook.FeatureState>
  ) {}

  ngOnInit() {
    this.bookState = this.store.select('books');
  }

  onNewBook() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
