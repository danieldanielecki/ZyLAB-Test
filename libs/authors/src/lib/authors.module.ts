import { AuthorsComponent } from './authors/authors.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@libs/shared/src/index';

@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: AuthorsComponent }]),
    SharedModule
  ]
})
export class AuthorsModule {}
