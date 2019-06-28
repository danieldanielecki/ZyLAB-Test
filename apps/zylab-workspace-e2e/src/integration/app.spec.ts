import { getHeader, getParagraph } from '../support/app.po';

describe('Page: Home', () => {
  beforeEach(() => cy.visit('/'));

  it('should display home message', () => {
    getParagraph().contains('home works!');
  });
});

describe('Page: Authors', () => {
  beforeEach(() => cy.visit('/authors'));

  it('should display authors title', () => {
    getHeader().contains('Authors');
  });
});

describe('Page: Books', () => {
  beforeEach(() => cy.visit('/books'));

  it('should display books title', () => {
    getHeader().contains('Books');
  });
});
