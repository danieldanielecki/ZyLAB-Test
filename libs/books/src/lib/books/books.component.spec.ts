import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { BooksModule } from './../books.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksModule,
        EffectsModule.forRoot([]),
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create books component', () => {
    expect(component).toBeTruthy();
  });
});
