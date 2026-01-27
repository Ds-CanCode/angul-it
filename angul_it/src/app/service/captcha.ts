// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { CaptchaChallenge, CaptchaState, CaptchaResult } from '../models/captcha.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CaptchaStateService {
//   private readonly STORAGE_KEY = 'angul-it-captcha-state';
  
//   private initialChallenges: CaptchaChallenge[] = [
//     {
//       id: 1,
//       type: 'image-select',
//       question: 'Select all images containing cats',
//       options: [
//         { id: '1', label: 'Image 1', value: 'cat', imageUrl: '🐱' },
//         { id: '2', label: 'Image 2', value: 'dog', imageUrl: '🐶' },
//         { id: '3', label: 'Image 3', value: 'cat', imageUrl: '🐱' },
//         { id: '4', label: 'Image 4', value: 'bird', imageUrl: '🐦' },
//         { id: '5', label: 'Image 5', value: 'cat', imageUrl: '🐱' },
//         { id: '6', label: 'Image 6', value: 'fish', imageUrl: '🐠' },
//         { id: '7', label: 'Image 7', value: 'dog', imageUrl: '🐶' },
//         { id: '8', label: 'Image 8', value: 'cat', imageUrl: '🐱' },
//         { id: '9', label: 'Image 9', value: 'rabbit', imageUrl: '🐰' }
//       ],
//       correctAnswer: ['1', '3', '5', '8'],
//       completed: false
//     },
//     {
//       id: 2,
//       type: 'text-input',
//       question: 'Enter the text shown below: "AngulIt2026"',
//       correctAnswer: 'AngulIt2026',
//       completed: false
//     },
//     {
//       id: 3,
//       type: 'puzzle',
//       question: 'Solve: What is 15 + 27?',
//       correctAnswer: '42',
//       completed: false
//     },
//     {
//       id: 4,
//       type: 'image-select',
//       question: 'Select all images containing traffic lights',
//       options: [
//         { id: '1', label: 'Image 1', value: 'traffic-light', imageUrl: '🚦' },
//         { id: '2', label: 'Image 2', value: 'car', imageUrl: '🚗' },
//         { id: '3', label: 'Image 3', value: 'traffic-light', imageUrl: '🚦' },
//         { id: '4', label: 'Image 4', value: 'bus', imageUrl: '🚌' },
//         { id: '5', label: 'Image 5', value: 'bicycle', imageUrl: '🚲' },
//         { id: '6', label: 'Image 6', value: 'traffic-light', imageUrl: '🚦' },
//         { id: '7', label: 'Image 7', value: 'train', imageUrl: '🚂' },
//         { id: '8', label: 'Image 8', value: 'airplane', imageUrl: '✈️' },
//         { id: '9', label: 'Image 9', value: 'traffic-light', imageUrl: '🚦' }
//       ],
//       correctAnswer: ['1', '3', '6', '9'],
//       completed: false
//     },
//     {
//       id: 5,
//       type: 'slider',
//       question: 'Slide to verify you are human (move slider to 100)',
//       correctAnswer: '100',
//       completed: false
//     }
//   ];

//   private stateSubject: BehaviorSubject<CaptchaState>;
//   public state$: Observable<CaptchaState>;

//   constructor() {
//     const savedState = this.loadState();
//     this.stateSubject = new BehaviorSubject<CaptchaState>(savedState);
//     this.state$ = this.stateSubject.asObservable();
//   }

//   private loadState(): CaptchaState {
//     const saved = localStorage.getItem(this.STORAGE_KEY);
//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch (e) {
//         console.error('Error loading state:', e);
//       }
//     }
//     return this.getInitialState();
//   }

//   private getInitialState(): CaptchaState {
//     return {
//       challenges: JSON.parse(JSON.stringify(this.initialChallenges)),
//       currentChallengeIndex: 0,
//       startTime: Date.now(),
//       completed: false,
//       score: 0
//     };
//   }

//   private saveState(state: CaptchaState): void {
//     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
//   }

//   getState(): CaptchaState {
//     return this.stateSubject.value;
//   }

//   getCurrentChallenge(): CaptchaChallenge | null {
//     const state = this.getState();
//     return state.challenges[state.currentChallengeIndex] || null;
//   }

//   submitAnswer(answer: string | string[]): boolean {
//     const state = this.getState();
//     const currentChallenge = state.challenges[state.currentChallengeIndex];
    
//     if (!currentChallenge) return false;

//     let isCorrect = false;
    
//     if (Array.isArray(currentChallenge.correctAnswer)) {
//       const userAnswerArray = Array.isArray(answer) ? answer : [answer];
//       isCorrect = 
//         userAnswerArray.length === currentChallenge.correctAnswer.length &&
//         userAnswerArray.every(a => currentChallenge.correctAnswer.includes(a));
//     } else {
//       isCorrect = answer === currentChallenge.correctAnswer;
//     }

//     currentChallenge.userAnswer = answer;
//     currentChallenge.completed = isCorrect;
    
//     if (isCorrect) {
//       state.score += 20; // 20 points per correct answer
//     }

//     this.updateState(state);
//     return isCorrect;
//   }

//   nextChallenge(): boolean {
//     const state = this.getState();
//     if (state.currentChallengeIndex < state.challenges.length - 1) {
//       state.currentChallengeIndex++;
//       this.updateState(state);
//       return true;
//     }
//     return false;
//   }

//   previousChallenge(): boolean {
//     const state = this.getState();
//     if (state.currentChallengeIndex > 0) {
//       state.currentChallengeIndex--;
//       this.updateState(state);
//       return true;
//     }
//     return false;
//   }

//   completeAllChallenges(): void {
//     const state = this.getState();
//     state.completed = true;
//     state.endTime = Date.now();
//     this.updateState(state);
//   }

//   getResult(): CaptchaResult {
//     const state = this.getState();
//     const correctAnswers = state.challenges.filter(c => c.completed).length;
//     const timeSpent = state.endTime 
//       ? Math.floor((state.endTime - state.startTime) / 1000) 
//       : 0;
    
//     return {
//       totalChallenges: state.challenges.length,
//       correctAnswers,
//       score: state.score,
//       timeSpent,
//       passed: correctAnswers === state.challenges.length
//     };
//   }

//   resetCaptcha(): void {
//     const newState = this.getInitialState();
//     this.updateState(newState);
//     localStorage.removeItem(this.STORAGE_KEY);
//   }

//   private updateState(state: CaptchaState): void {
//     this.saveState(state);
//     this.stateSubject.next(state);
//   }

//   isCompleted(): boolean {
//     return this.getState().completed;
//   }

//   canAccessResults(): boolean {
//     const state = this.getState();
//     return state.completed && state.challenges.every(c => c.completed);
//   }
// }