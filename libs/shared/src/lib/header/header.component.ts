import { Component } from '@angular/core';
import {
  faBars,
  faBookOpen,
  faHome,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor() {
    library.add(faBars);
    library.add(faBookOpen);
    library.add(faHome);
    library.add(faUser);
  }

  public menuItems: { icon: [string, string]; name: string; path: string }[] = [
    { icon: ['fas', 'home'], name: 'Home', path: '/' },
    { icon: ['fas', 'user'], name: 'Authors', path: '/authors' },
    { icon: ['fas', 'book-open'], name: 'Books', path: '/books' }
  ];
}
