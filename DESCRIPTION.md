# Task Description & Requirements

## `Library` application is an electronic library catalogue.

Application should have two feature areas: Books and Authors.
In the application Skeleton you have the Toolbar with two links as the placeholders.

### The `Books` page has a list containing all books in the library

- Book names are displayed in the list.
- User can select book from the list: book details will be displayed next to the list.
- No book is selected by default in the list.
- User can delete the book. The book will disappear from the list along with it's details.
- User should be able to filter out the books by book name or part of book name. Filtration is case insensitive.
- Filtration can be dropped by erasing the filter criteria.
- [OPTIONAL] User should be able to create a new Book.

### Every Book has an associated form with book details

- Book has the following fields: 'Title', 'Author', 'Publisher', 'Year of publishing'.
- All those fields are mandatory.
- 'Title', 'Publisher' fields can take any symbols as an input. Maximum lenght is 140 symbols.
- 'Author' should allow to select one of the existing authors.
- 'Year of publishing' takes only numbers as an input.
- User can modify book properties and Save or Cancel the changes through appropriate buttons. Save and Cancel button should be active only when form has changes.

### The `Authors` page has a list of Authors in the Library

- Authors should be shown in the list with a filter in the similar way as Books page does.
- You should be able to add & remove authors from the list.
- For each author you should provide a list his books as Read-Only info.
- When you remove author - all his books should be removed as well in cascade manner.
- Author has the following fields: 'Name', 'Year of Birth'
- All those fields are mandatory and has some reasonable validation rules (for developer to decide).

## Candidate objectives

- Based on given Application Requirements, you have to create:
  - SPA which satisfies the requirements
  - Implement Unit Tests that cover these requirements
  - [OPTIONAL] Implement end-to-end Tests that cover these requirements. File names with your code of e2e tests should have `*.e2e-spec.ts` format and should be placed in `e2e` folder

## Results delivery

- Provide entire solution as a zipped file, in the same way it was given to you (node_modules is not required to be in)

## [OPTIONAL] Tips and Suggestions for e2e testing

# TODO: data-test-\* in E2E

- Prefer to use `data-test-*` attributes for element location
- Most of the interactive DOM elements are already marked with `data-test-*` attributes. Use DOM explorer to find them
