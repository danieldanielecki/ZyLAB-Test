import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as AuthorActions from '../store/author.actions';
import * as fromAuthor from '../store/author.reducers';

@Component({
  selector: 'app-authors-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  authorForm: FormGroup;
  editMode = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAuthor.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      console.log((this.editMode = params['id'] != null)); // TODO: Comment for production.
      this.id = +params['id'];
      this.initForm();
    });
  }

  onSubmit() {
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

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
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
      name: new FormControl(authorName, Validators.required),
      yearOfBirth: new FormControl(authorYearOfBirth, Validators.required)
    });
  }
}
