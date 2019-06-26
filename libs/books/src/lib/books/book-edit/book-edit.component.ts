import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as BookActions from '../store/book.actions';
import * as fromBook from '../store/book.reducers';

@Component({
  selector: 'app-books-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  editMode = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromBook.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new BookActions.UpdateBook({
          index: this.id,
          updatedBook: this.bookForm.value
        })
      );
    } else {
      this.store.dispatch(new BookActions.AddBook(this.bookForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let bookYear = 0;
    let bookTitle = '';
    let bookauthorId = 0;
    let bookPublisher = '';

    if (this.editMode) {
      this.store
        .select('books')
        .pipe(take(1))
        .subscribe((bookState: fromBook.State) => {
          const book = bookState.books[this.id];
          bookYear = book.year;
          bookTitle = book.title;
          bookauthorId = book.authorId;
          bookPublisher = book.publisher;
        });
    }

    this.bookForm = new FormGroup({
      year: new FormControl(bookYear, Validators.required),
      title: new FormControl(bookTitle, Validators.required),
      authorId: new FormControl(bookauthorId, Validators.required),
      publisher: new FormControl(bookPublisher, Validators.required)
    });
  }
}
