import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@libs/shared/src/index';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule]
})
export class HomeModule {}
