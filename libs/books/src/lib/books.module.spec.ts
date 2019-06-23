import { async, TestBed } from '@angular/core/testing';
import { BooksModule } from './books.module';

describe('BooksModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksModule]
    }).compileComponents();
  }));

  it('should create books module', () => {
    expect(BooksModule).toBeDefined();
  });
});
