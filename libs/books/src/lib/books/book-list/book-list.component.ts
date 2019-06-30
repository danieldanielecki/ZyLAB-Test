import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../book.model';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as BookActions from '../store/book.actions';
import * as fromBook from '../store/book.reducers';

@Component({
  selector: 'app-books-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements AfterViewInit, OnInit {
  public bookState: Observable<fromBook.State>;
  public dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  public displayedColumns: string[] = ['title'];
  private searchSubject$: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromBook.FeatureState>
  ) {}

  ngOnInit() {
    this.bookState = this.store.select('books');
  }

  // Once the view will be initialized load the data.
  ngAfterViewInit() {
    this.bookState
      .pipe(
        map((response: any) => {
          return response.books.map((item: any) => {
            return new Book(
              item.year,
              item.title,
              item.authorId,
              item.publisher
            );
          });
        }),
        // Handle errors. There's not actually call to API, thus it's just as a practice. Different types of errors (mapping/throwing) in such scenario could be added as well as finalize/tap.
        catchError((error: any) => {
          console.log('Caught mapping error: ', error); // TODO: Comment for production.
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
        this.dataSource.filter = filterValue.trim().toLowerCase(); // Filter data in books table.
      });
  }

  public onNewBook(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public onSaveBooks(): void {
    this.store.dispatch(new BookActions.StoreBooks());
  }

  public onFetchBooks(): void {
    this.store.dispatch(new BookActions.FetchBooks());
  }

  // Based on user input apply her/his desired filter value in order to show results of the filtering.
  public applyFilter(filterValue: string): void {
    this.searchSubject$.next(filterValue);
  }
}
