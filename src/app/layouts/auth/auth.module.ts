import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';

import {SharedModule} from '@shared/shared.module';
import {FeaturesModule} from '@features/features.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@shared/helpers/auth.interceptor';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    SharedModule,
    FeaturesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {
}
