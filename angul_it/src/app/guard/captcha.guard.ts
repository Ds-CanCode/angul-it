import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CaptchaStateService } from '../service/captcha-state.service';


@Injectable({
  providedIn: 'root'
})
export class CaptchaGuard implements CanActivate {

  constructor(
    private state: CaptchaStateService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path || '';


    if (path === '') {
      const progress = this.state.getProgress();
      if (progress < 1) {
        this.router.navigate(['/captcha1']);
        return false;
      }
      return true;
    }

    const match = path.match(/captcha(\d+)/);
    const requestedStage = match ? parseInt(match[1], 10) : 1;

    if (this.state.canAccessStage(requestedStage)) {
      return true;
    }

    const currentStage = this.state.getProgress();
    this.router.navigate([`/captcha${currentStage}`]);
    return false;
  }
}
