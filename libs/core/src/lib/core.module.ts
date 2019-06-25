import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
  exports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreModule.forRoot([])
  ]
})
export class CoreModule {
  // Prevent from importing CoreModule more than once.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
