import { ActivatedRoute, Params, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';
import * as AuthorActions from '../store/author.actions';
import * as fromAuthor from '../store/author.reducers';

@Component({
  selector: 'app-authors-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements AfterViewInit, OnInit {
  public authorForm: FormGroup;
  public editMode = false;
  public hasChanged = false;
  public id: number = null;
  public initialFormData: {} = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAuthor.FeatureState>
  ) {}

  ngAfterViewInit() {
    // Get changed values of form.
    this.authorForm.valueChanges.subscribe(changes => {
      // Parse JSON only if year of birth isn't empty.
      if (changes.yearOfBirth !== '') {
        const dataChanges = [
          JSON.parse(JSON.stringify(changes.name)),
          JSON.parse(changes.yearOfBirth)
        ];

        if (_.isEqual(dataChanges, this.initialFormData)) {
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
        new AuthorActions.UpdateAuthor({
          index: this.id,
          updatedAuthor: this.authorForm.value
        })
      );
    } else {
      console.log(this.authorForm.value); // TODO: Comment for production.
      this.store.dispatch(new AuthorActions.AddAuthor(this.authorForm.value));
    }
    this.onCancel();
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(): {} {
    let authorName = '';
    let authorYearOfBirth = null;

    if (this.editMode) {
      this.store
        .select('authors')
        .pipe(take(1))
        .subscribe((authorState: fromAuthor.State) => {
          const author = authorState.authors[this.id];
          authorName = author.name;
          authorYearOfBirth = author.yearOfBirth;
        });
    }

    this.authorForm = new FormGroup({
      name: new FormControl(authorName, [
        Validators.maxLength(64),
        Validators.required
      ]),
      yearOfBirth: new FormControl(authorYearOfBirth, [
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])
    });

    return [authorName, authorYearOfBirth];
  }
}
