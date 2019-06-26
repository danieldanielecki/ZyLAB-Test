import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorsComponent } from './authors.component';
import { AuthorsModule } from './../authors.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthorsModule,
        EffectsModule.forRoot([]),
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create authors component', () => {
    expect(component).toBeTruthy();
  });
});
