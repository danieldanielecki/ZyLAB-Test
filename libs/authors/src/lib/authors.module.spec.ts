import { async, TestBed } from '@angular/core/testing';
import { AuthorsModule } from './authors.module';

describe('AuthorsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthorsModule]
    }).compileComponents();
  }));

  it('should create authors module', () => {
    expect(AuthorsModule).toBeDefined();
  });
});
