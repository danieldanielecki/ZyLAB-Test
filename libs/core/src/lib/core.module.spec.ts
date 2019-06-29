import { async, TestBed } from '@angular/core/testing';
import { CoreModule } from './core.module';

declare const API_KEY_FIREBASE_DEVELOPMENT: string;

describe('CoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule]
    }).compileComponents();
  }));

  it('should create core module', () => {
    expect(CoreModule).toBeDefined();
  });
});
