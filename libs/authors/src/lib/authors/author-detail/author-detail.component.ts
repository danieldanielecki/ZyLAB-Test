import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthorActions from '../store/author.actions';
import * as fromAuthor from '../store/author.reducers';

@Component({
  selector: 'app-authors-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
  authorState: Observable<fromAuthor.State>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAuthor.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.authorState = this.store.select('authors');
    });
  }

  onEditAuthor() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteAuthor() {
    this.store.dispatch(new AuthorActions.DeleteAuthor(this.id));
    this.router.navigate(['/authors']);
  }
}
