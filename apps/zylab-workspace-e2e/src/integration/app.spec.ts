import { getGreeting } from '../support/app.po';

describe('zylab-workspace', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to zylab-workspace!');
  });
});
