import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'; // ייבוא ערכת הנושא Aura
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

// שולח את עוגיית ה-jwt לשרת בכל בקשה (השרת יושב על פורט אחר)
const withCredentialsInterceptor: HttpInterceptorFn = (req, next) =>
  next(req.clone({ withCredentials: true }));

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideHttpClient(withInterceptors([withCredentialsInterceptor])),
    providePrimeNG({
      theme: {
          preset: Aura // כאן את קובעת את ערכת הנושא
      }
  })
  ]
};

