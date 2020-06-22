import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import {environment} from '@environments/environment';

// import {LoaderService} from '@shared/services/data/loader.service';
// import {LoaderInterceptor} from '@shared/helpers/loader.iterceptor';
// import {DataService} from '@shared/services/data/data.service';
// import {MediaService} from '@shared/services/media.service';
// import {CustomPreloadStrategy} from '@shared/helpers/customPreloadStrategy';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        // CustomPreloadStrategy,
        // LoaderService,
        // DataService,
        // MediaService,
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: LoaderInterceptor,
        //   multi: true
        // }
      ]
    };
  }
}
