import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../service/captcha-state.service';

@Component({
  selector: 'app-captcha-3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './captcha-3.html',
  styleUrls: ['./captcha-3.css']
})
export class Captcha3 {
  private readonly CURRENT_STAGE = 3;
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
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const op = operators[Math.floor(Math.random() * operators.length)];

    switch(op) {
      case '+':
        this.captchaAnswer = a + b;
        break;
      case '-':
        this.captchaAnswer = a - b;
        break;
      case '*':
        this.captchaAnswer = a * b;
        break;
    }

    this.captchaQuestion = `${a} ${op} ${b} = ?`;
    this.userInput = '';
    this.errorMessage = '';
  }
  refreshCaptcha() {
    this.generateCaptcha();
  }

  validateCaptcha() {
    if (this.state.canAccessStage(this.CURRENT_STAGE + 1)) {
      this.router.navigate([`/captcha${this.CURRENT_STAGE + 1}`]);
      return;
    }
    if (parseInt(this.userInput) === this.captchaAnswer) {
      this.errorMessage = '';
      this.state.saveProgress(this.CURRENT_STAGE+1);
      this.router.navigate([`/captcha${this.CURRENT_STAGE + 1}`]);
    } else {      
      this.generateCaptcha();
      this.errorMessage = 'Captcha incorrect, veuillez réessayer.';
    }
  }

  goBack() {
    this.router.navigate([`/captcha${this.CURRENT_STAGE - 1}`]);
  }

}
