import { Book } from '../../../book.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-books-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent {
  @Input() book: Book;
  @Input() index: number;
}
