
// enableProdMode();

// bootstrap(AppComponent, [

    // HTTP_PROVIDERS,
    // ROUTER_PROVIDERS,
    // FORM_PROVIDERS,
    // SignalRClient,
    // SmartCardAuth,
    // provideStore({
    //     menu,
    //     smartCard
//     })
// ]);


/*
 * Providers provided by Angular
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
/*
* Platform and Environment
* our providers/directives/pipes
*/
import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS, decorateComponentRef } from './platform/environment';
import { provide, enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { FORM_PROVIDERS } from '@angular/common';
import 'rxjs/Rx';
import * as $ from 'jquery';
import 'ms-signalr-client';
import { SignalRClient } from './app/shared/signalr/signalr-client.service';
import { SmartCardAuth } from './app/shared/signalr/smartcard.service';
// @ngrx
import { provideStore } from '@ngrx/store';
// reducers
import { menu } from './app/_portal/reducers/menu';
import { smartCard } from './app/_portal/reducers/smart-card';

/*
* App Component
* our top level component that holds all of our components
*/
import { AppComponent, APP_PROVIDERS } from './app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(AppComponent, [
    ...PLATFORM_PROVIDERS,
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    SignalRClient,
    SmartCardAuth,
    provideStore({
        menu,
        smartCard
      })
  ])
  .then(decorateComponentRef)
  .catch(err => console.error(err));

}





/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}