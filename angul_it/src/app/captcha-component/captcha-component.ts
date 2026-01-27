// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-captcha',
//   templateUrl: './captcha.component.html',
//   styleUrls: ['./captcha.component.scss']
// })
// export class CaptchaComponent implements OnInit, OnDestroy {
//   currentChallenge: CaptchaChallenge | null = null;
//   currentState: CaptchaState | null = null;
//   selectedOptions: Set<string> = new Set();
//   textInput: string = '';
//   sliderValue: number = 0;
//   errorMessage: string = '';
//   isSubmitting: boolean = false;
//   private stateSubscription?: Subscription;

//   constructor(
//     private captchaStateService: CaptchaStateService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.stateSubscription = this.captchaStateService.state$.subscribe(state => {
//       this.currentState = state;
//       this.currentChallenge = this.captchaStateService.getCurrentChallenge();
//       this.resetInputs();
//     });
//   }

//   ngOnDestroy(): void {
//     this.stateSubscription?.unsubscribe();
//   }

//   toggleOption(optionId: string): void {
//     if (this.selectedOptions.has(optionId)) {
//       this.selectedOptions.delete(optionId);
//     } else {
//       this.selectedOptions.add(optionId);
//     }
//     this.errorMessage = '';
//   }

//   isSelected(optionId: string): boolean {
//     return this.selectedOptions.has(optionId);
//   }

//   onSliderChange(event: Event): void {
//     const target = event.target as HTMLInputElement;
//     this.sliderValue = parseInt(target.value, 10);
//     this.errorMessage = '';
//   }

//   submitAnswer(): void {
//     if (!this.currentChallenge) return;

//     this.isSubmitting = true;
//     this.errorMessage = '';

//     let answer: string | string[] = '';

//     switch (this.currentChallenge.type) {
//       case 'image-select':
//         answer = Array.from(this.selectedOptions);
//         if (answer.length === 0) {
//           this.errorMessage = 'Please select at least one image.';
//           this.isSubmitting = false;
//           return;
//         }
//         break;
//       case 'text-input':
//         answer = this.textInput.trim();
//         if (!answer) {
//           this.errorMessage = 'Please enter the text.';
//           this.isSubmitting = false;
//           return;
//         }
//         break;
//       case 'puzzle':
//         answer = this.textInput.trim();
//         if (!answer) {
//           this.errorMessage = 'Please enter your answer.';
//           this.isSubmitting = false;
//           return;
//         }
//         break;
//       case 'slider':
//         answer = this.sliderValue.toString();
//         break;
//     }

//     setTimeout(() => {
//       const isCorrect = this.captchaStateService.submitAnswer(answer);
      
//       if (isCorrect) {
//         this.errorMessage = '';
//         setTimeout(() => {
//           this.nextChallenge();
//         }, 500);
//       } else {
//         this.errorMessage = 'Incorrect answer. Please try again.';
//         this.isSubmitting = false;
//       }
//     }, 300);
//   }

//   nextChallenge(): void {
//     const hasNext = this.captchaStateService.nextChallenge();
//     if (!hasNext) {
//       this.captchaStateService.completeAllChallenges();
//       this.router.navigate(['/result']);
//     }
//     this.isSubmitting = false;
//   }

//   previousChallenge(): void {
//     this.captchaStateService.previousChallenge();
//     this.errorMessage = '';
//   }

//   canGoPrevious(): boolean {
//     return this.currentState ? this.currentState.currentChallengeIndex > 0 : false;
//   }

//   getProgress(): number {
//     if (!this.currentState) return 0;
//     return ((this.currentState.currentChallengeIndex + 1) / this.currentState.challenges.length) * 100;
//   }

//   getChallengeNumber(): string {
//     if (!this.currentState) return '0/0';
//     return `${this.currentState.currentChallengeIndex + 1}/${this.currentState.challenges.length}`;
//   }

//   private resetInputs(): void {
//     this.selectedOptions.clear();
//     this.textInput = '';
//     this.sliderValue = 0;
//     this.errorMessage = '';
//     this.isSubmitting = false;
//   }
// }