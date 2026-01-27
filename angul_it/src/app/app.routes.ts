import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home-component/home-component').then(m => m.HomeComponent) },
    // { path: '/captcha', loadComponent: () => import('./captcha-component/captcha-component').then(m => m.CaptchaComponent) },
];
