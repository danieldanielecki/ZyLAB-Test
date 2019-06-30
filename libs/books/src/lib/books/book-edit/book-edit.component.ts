import { ActivatedRoute, Params, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';
import * as BookActions from '../store/book.actions';
import * as fromAuthor from '@libs/authors/src/lib/authors/store/author.reducers';
import * as fromBook from '../store/book.reducers';

@Component({
  selector: 'app-books-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements AfterViewInit, OnInit {
  public authorState: Observable<fromAuthor.State>;
  public bookForm: FormGroup;
  public bookState: Observable<fromBook.State>;
  public editMode = false;
  public hasChanged = false;
  public id: number;
  public initialFormData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeAuthors: Store<fromAuthor.FeatureState>,
    private storeBooks: Store<fromBook.FeatureState>
  ) {}

  ngAfterViewInit() {
    // Get changed values of form.
    this.bookForm.valueChanges.subscribe(changes => {
      // Parse JSON only if year isn't empty.
      if (changes.year !== '') {
        const dataChanges = [
          JSON.parse(changes.year),
          JSON.parse(JSON.stringify(changes.title)),
          JSON.parse(JSON.stringify(changes.publisher))
        ];

        console.log(dataChanges);
        if (
          _.isEqual(
            dataChanges,
            JSON.parse(JSON.stringify(this.initialFormData))
          )
        ) {
          this.hasChanged = false;
        } else {
          this.hasChanged = true;
        }
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.authorState = this.storeAuthors.select('authors');
      this.bookState = this.storeBooks.select('books');
      this.editMode = params['id'] != null;
      this.id = +params['id'];
      this.initialFormData = this.initForm();
    });
  }

  // Allow only numbers.
  public allowOnlyNumbers(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public onSubmit(): void {
    if (this.editMode) {
      this.storeBooks.dispatch(
        new BookActions.UpdateBook({
          index: this.id,
          updatedBook: this.bookForm.value
        })
      );
    } else {
      this.storeBooks.dispatch(new BookActions.AddBook(this.bookForm.value));
    }
    this.onCancel();
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(): {} {
    let bookYear = null;
    let bookTitle = '';
    let bookPublisher = '';

    if (this.editMode) {
      this.storeBooks
        .select('books')
        .pipe(take(1))
        .subscribe((bookState: fromBook.State) => {
          const book = bookState.books[this.id];
          bookYear = book.year;
          bookTitle = book.title;
          bookPublisher = book.publisher;
        });
    }

    this.bookForm = new FormGroup({
      year: new FormControl(bookYear, [
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ]),
      title: new FormControl(bookTitle, [
        Validators.maxLength(140),
        Validators.required
      ]),
      publisher: new FormControl(bookPublisher, [
        Validators.maxLength(140),
        Validators.required
      ])
    });

    return [bookYear, bookTitle, bookPublisher];
  }
}
