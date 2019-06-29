import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const authorsRoutes: Routes = [
  {
    path: '',
    component: AuthorsComponent,
    children: [
      { path: 'new', component: AuthorEditComponent },
      { path: ':id', component: AuthorDetailComponent },
      { path: ':id/edit', component: AuthorEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authorsRoutes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule {}
