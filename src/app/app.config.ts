import {ApplicationConfig,provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptorInterceptor} from './interceptors/auth-interceptor.interceptor';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptorInterceptor])
    ),
    provideCharts(withDefaultRegisterables()),
    FontAwesomeModule,
  ],

};
