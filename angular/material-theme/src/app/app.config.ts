import {
  APP_INITIALIZER,
  ApplicationConfig,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const providerSplashScreen: Provider = [
  { provide: APP_INITIALIZER, multi: true, useFactory: loadCrucialData() },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providerSplashScreen,
  ],
};

// Delay Splash Screen
function loadCrucialData() {
  return function () {
    return delay(0);
  };
}

function delay(delay: number) {
  return function () {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  };
}
