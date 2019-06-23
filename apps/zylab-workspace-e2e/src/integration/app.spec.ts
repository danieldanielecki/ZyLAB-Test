import { getParagraph } from '../support/app.po';

describe('Page: Home', () => {
  beforeEach(() => cy.visit('/'));

  it('should display home message', () => {
    getParagraph().contains('home works!');
  });
});

describe('Page: Authors', () => {
  beforeEach(() => cy.visit('/authors'));

  it('should display authors message', () => {
    getParagraph().contains('authors works!');
  });
});

describe('Page: Books', () => {
  beforeEach(() => cy.visit('/books'));

  it('should display books message', () => {
    getParagraph().contains('books works!');
  });
});
