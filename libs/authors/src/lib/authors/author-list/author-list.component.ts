import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuthor from '../store/author.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authors-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authorState: Observable<fromAuthor.State>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAuthor.FeatureState>
  ) {}

  ngOnInit() {
    this.authorState = this.store.select('authors');
  }

  onNewAuthor() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
