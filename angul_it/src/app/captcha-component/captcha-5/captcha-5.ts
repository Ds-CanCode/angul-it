import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../service/captcha-state.service';

@Component({
  selector: 'app-captcha-5',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './captcha-5.html',
  styleUrls: ['./captcha-5.css']
})
export class Captcha5 {
  private readonly CURRENT_STAGE = 5;
  captchaQuestion: string = '';
  captchaAnswer: number = 0;

  userInput: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private state: CaptchaStateService) {
    this.generateCaptcha();
  }

  ngOnInit() {
    if (!this.state.canAccessStage(this.CURRENT_STAGE)) {
      this.router.navigate([`/captcha${this.state.getProgress()}`]);
      return;
    }

  }

  generateCaptcha() {
    const captchas = 
      { question: "ln(e^√2) - √2 + 1", answer: 1 }
    ;


    this.captchaQuestion = captchas.question + " = ?";
    this.captchaAnswer = captchas.answer;

    this.userInput = '';
    this.errorMessage = '';
  }

  refreshCaptcha() {
    this.generateCaptcha();
  }

  validateCaptcha() {
    if (Number(this.userInput) === this.captchaAnswer) {
      this.errorMessage = '';
      this.state.saveProgress(this.CURRENT_STAGE + 1);
      this.router.navigate([`/result`]);
    } else {
      this.generateCaptcha();
      this.errorMessage = 'Captcha incorrect, veuillez réessayer.';
    }
  }

  goBack() {
    this.router.navigate([`/captcha${this.CURRENT_STAGE - 1}`]);
  }

}
