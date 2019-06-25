import { authorReducer } from './authors/store/author.reducers';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorEffects } from './authors/store/author.effects';
import { AuthorItemComponent } from './authors/author-list/author-item/author-item.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@libs/shared/src/index';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AuthorDetailComponent,
    AuthorEditComponent,
    AuthorItemComponent,
    AuthorListComponent,
    AuthorsComponent
  ],
  imports: [
    AuthorsRoutingModule,
    EffectsModule.forFeature([AuthorEffects]),
    RouterModule.forChild([{ path: '', component: AuthorsComponent }]),
    SharedModule,
    StoreModule.forFeature('authors', authorReducer)
  ]
})
export class AuthorsModule {}
