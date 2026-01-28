import { Routes } from '@angular/router';
import { CaptchaGuard } from './guard/captcha.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home-component/home-component').then(m => m.HomeComponent) , canActivate: [CaptchaGuard]},
    { path: 'captcha1', loadComponent: () => import('./captcha-component/captcha-1/captcha-1').then(m => m.Captcha1), canActivate: [CaptchaGuard] },
    { path: 'captcha2', loadComponent: () => import('./captcha-component/captcha-2/captcha-2').then(m => m.Captcha2), canActivate: [CaptchaGuard] },
    { path: 'captcha3', loadComponent: () => import('./captcha-component/captcha-3/captcha-3').then(m => m.Captcha3), canActivate: [CaptchaGuard] },
];
