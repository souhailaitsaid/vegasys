/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from './app.config';
import { TranslateModule, TranslateLoader, TranslateService, } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

export function initConfig(config: AppConfig) {
  return () => config.loadAppConfig();
}
@NgModule({
  declarations: [AppComponent],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: LOCALE_ID, useFactory: (translate: TranslateService) => {
        return translate.currentLang;
      },
      deps: [TranslateService]
    },
  ],
})
export class AppModule {
}
