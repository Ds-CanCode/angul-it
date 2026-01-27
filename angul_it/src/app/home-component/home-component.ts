import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent {
  constructor(
    //private router: Router,
    // private captchaStateService: CaptchaStateService
  ) {}

  // startChallenge(): void {
  //   this.captchaStateService.resetCaptcha();
  //   this.router.navigate(['/captcha']);
  // }

  // continueChallenge(): void {
  //   this.router.navigate(['/captcha']);
  // }

  // hasSavedProgress(): boolean {
  //   const state = this.captchaStateService.getState();
  //   return state.currentChallengeIndex > 0 || state.challenges.some(c => c.completed);
  // }
}