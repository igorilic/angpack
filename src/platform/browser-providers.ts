/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
// Angular 2 forms
// import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { FORM_PROVIDERS } from '@angular/common';

// AngularClass
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';


// import { routes, asyncRoutes, prefetchRouteCallbacks } from '../app/app.routes';
/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  // disableDeprecatedForms(),
  // provideForms(),
  
  // provideRouter(routes),
  // provideWebpack(asyncRoutes),
  // providePrefetchIdleCallbacks(prefetchRouteCallbacks),
  ...ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...FORM_PROVIDERS,

  { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
