import { Routes } from '@angular/router';
import { CaptchaGuard } from './guard/captcha.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home-component/home-component').then(m => m.HomeComponent) , canActivate: [CaptchaGuard]},
    { path: 'captcha1', loadComponent: () => import('./captcha-component/captcha-1/captcha-1').then(m => m.Captcha1), canActivate: [CaptchaGuard] },
    { path: 'captcha2', loadComponent: () => import('./captcha-component/captcha-2/captcha-2').then(m => m.Captcha2), canActivate: [CaptchaGuard] },
    { path: 'captcha3', loadComponent: () => import('./captcha-component/captcha-3/captcha-3').then(m => m.Captcha3), canActivate: [CaptchaGuard] },
    { path: 'captcha4', loadComponent: () => import('./captcha-component/captcha-4/captcha-4').then(m => m.Captcha4), canActivate: [CaptchaGuard] },
    { path: 'captcha5', loadComponent: () => import('./captcha-component/captcha-5/captcha-5').then(m => m.Captcha5), canActivate: [CaptchaGuard] },
    { path: 'result', loadComponent: () => import('./result-component/result-component').then(m => m.ResultComponent), canActivate: [CaptchaGuard] },
];
