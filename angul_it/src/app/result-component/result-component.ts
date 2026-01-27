// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CaptchaStateService } from '../../services/captcha-state.service';
// import { CaptchaResult } from '../../models/captcha.model';

// @Component({
//   selector: 'app-result',
//   templateUrl: './result.component.html',
//   styleUrls: ['./result.component.scss']
// })
// export class ResultComponent implements OnInit {
//   result: CaptchaResult | null = null;
//   animationDelay = 0;

//   constructor(
//     private captchaStateService: CaptchaStateService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.result = this.captchaStateService.getResult();
//   }

//   getScorePercentage(): number {
//     if (!this.result) return 0;
//     return (this.result.score / 100) * 100;
//   }

//   getAccuracyPercentage(): number {
//     if (!this.result) return 0;
//     return (this.result.correctAnswers / this.result.totalChallenges) * 100;
//   }

//   getStatusMessage(): string {
//     if (!this.result) return '';
//     return this.result.passed 
//       ? 'Human Verified! ✓' 
//       : 'Verification Failed';
//   }

//   getStatusClass(): string {
//     if (!this.result) return '';
//     return this.result.passed ? 'success' : 'failed';
//   }

//   formatTime(seconds: number): string {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}m ${secs}s`;
//   }

//   restartChallenge(): void {
//     this.captchaStateService.resetCaptcha();
//     this.router.navigate(['/']);
//   }

//   getStarCount(): number {
//     if (!this.result) return 0;
//     const percentage = this.getAccuracyPercentage();
//     if (percentage === 100) return 5;
//     if (percentage >= 80) return 4;
//     if (percentage >= 60) return 3;
//     if (percentage >= 40) return 2;
//     if (percentage >= 20) return 1;
//     return 0;
//   }

//   getStars(): string[] {
//     const count = this.getStarCount();
//     return Array(count).fill('⭐');
//   }
// }