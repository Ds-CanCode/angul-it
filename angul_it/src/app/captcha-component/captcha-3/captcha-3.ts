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
  @Output() onBack = new EventEmitter<void>();
  captchaCode: string = this.generateCaptcha();
  userInput: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private state: CaptchaStateService) { }

  generateCaptcha(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code.split('').join(' ');
  }

  refreshCaptcha() {
    this.captchaCode = this.generateCaptcha();
    this.userInput = '';
    this.errorMessage = '';
  }

  validateCaptcha() {
    if (this.userInput.replace(/\s+/g, '') === this.captchaCode.replace(/\s+/g, '')) {
      this.errorMessage = '';
      this.state.saveProgress(2);
      this.router.navigate(['/captcha2']);
    } else {
      this.errorMessage = 'Captcha incorrect, veuillez réessayer.';
    }
  }

  goBack() {
    this.router.navigate([`/captcha${this.CURRENT_STAGE - 1}`]);
  }

}
