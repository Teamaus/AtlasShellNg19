import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AtlasShellUIModule } from 'atlas-shell-ui';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)
    ,importProvidersFrom(AtlasShellUIModule.forRoot("shell"))
  ]
};
