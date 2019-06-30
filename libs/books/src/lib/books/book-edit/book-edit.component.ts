import { ActivatedRoute, Params, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';
import * as BookActions from '../store/book.actions';
import * as fromBook from '../store/book.reducers';

@Component({
  selector: 'app-books-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements AfterViewInit, OnInit {
  public bookForm: FormGroup;
  public editMode = false;
  public hasChanged = false;
  public id: number;
  public initialFormData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromBook.FeatureState>
  ) {}

  ngAfterViewInit() {
    // Get changed values of form.
    this.bookForm.valueChanges.subscribe(changes => {
      // Parse JSON only if year & author ID aren't empty.
      if (changes.year !== '' && changes.authorId !== '') {
        const dataChanges = [
          JSON.parse(changes.year),
          JSON.parse(JSON.stringify(changes.title)),
          JSON.parse(changes.authorId),
          JSON.parse(JSON.stringify(changes.publisher))
        ];

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
      this.store.dispatch(
        new BookActions.UpdateBook({
          index: this.id,
          updatedBook: this.bookForm.value
        })
      );
    } else {
      console.log(this.bookForm.value); // TODO: Comment for production.
      this.store.dispatch(new BookActions.AddBook(this.bookForm.value));
    }
    this.onCancel();
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(): {} {
    let bookYear = null;
    let bookTitle = '';
    let bookauthorId = null;
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
      year: new FormControl(bookYear, [
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ]),
      title: new FormControl(bookTitle, [
        Validators.maxLength(140),
        Validators.required
      ]),
      authorId: new FormControl(bookauthorId, Validators.required),
      publisher: new FormControl(bookPublisher, [
        Validators.maxLength(140),
        Validators.required
      ])
    });

    return [bookYear, bookTitle, bookauthorId, bookPublisher];
  }
}
