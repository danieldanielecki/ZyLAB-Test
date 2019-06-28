import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../author.model';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as fromAuthor from '../store/author.reducers';

@Component({
  selector: 'app-authors-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements AfterViewInit, OnInit {
  public authorState: Observable<fromAuthor.State>;
  public dataSource: MatTableDataSource<Author> = new MatTableDataSource<
    Author
  >();
  public displayedColumns: string[] = ['name', 'yearOfBirth'];
  private searchSubject$: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAuthor.FeatureState>
  ) {}

  ngOnInit() {
    this.authorState = this.store.select('authors');
  }

  // Once the view will be initialized load the data.
  ngAfterViewInit() {
    this.authorState
      .pipe(
        map((response: any) => {
          return response.authors.map((item: any) => {
            return new Author(
              item.id.toString(),
              item.name.toString(),
              item.yearOfBirth.toString()
            );
          });
        }),
        // Handle errors. There's not actually call to API, thus it's just as a practice. Different types of errors (mapping/throwing) in such scenario could be added as well as finalize/tap.
        catchError((error: any) => {
          console.log('Caught mapping error: ', error);
          return throwError(error); // Throw an error.
        })
      )
      .subscribe(data => {
        setTimeout(() => {
          this.dataSource.data = data;
        });
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Display desired results after 1 second.
    this.searchSubject$
      .pipe(
        debounceTime(1000), // Limit requests to maximum one per second.
        distinctUntilChanged() // Eliminate duplicate values.
      )
      .subscribe((filterValue: string) => {
        this.dataSource.filter = filterValue.trim().toLowerCase(); // Filter data in authors table.
      });
  }

  onNewAuthor() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // Based on user input apply her/his desired filter value in order to show results of the filtering.
  applyFilter(filterValue: string) {
    this.searchSubject$.next(filterValue);
  }
}
