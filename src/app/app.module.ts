import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthComponent} from './auth/auth.component';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
