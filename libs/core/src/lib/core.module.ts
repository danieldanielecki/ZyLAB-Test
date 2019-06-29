import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
// import { environment } from '@zylab-workspace/src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  exports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreModule.forRoot([]),
    StoreRouterConnectingModule //,
    // !environment.production ? StoreDevtoolsModule.instrument() : [] // Empty array means "don't add this module".
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
