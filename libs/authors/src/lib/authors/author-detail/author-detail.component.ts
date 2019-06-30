import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthorActions from '../store/author.actions';
import * as fromAuthor from '../store/author.reducers';
import * as fromBook from '@libs/books/src/lib/books/store/book.reducers';

@Component({
  selector: 'app-authors-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
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

  onEditAuthor() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteAuthor() {
    this.storeAuthors.dispatch(new AuthorActions.DeleteAuthor(this.id));
    this.router.navigate(['/authors']);
  }
}
