import { Author } from '../../../author.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-authors-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.scss']
})
export class AuthorItemComponent {
  @Input() author: Author;
  @Input() index: number;
}
