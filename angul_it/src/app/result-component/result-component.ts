import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../service/captcha-state.service';
// import { CaptchaStateService } from '../../services/captcha-state.service';
// import { CaptchaResult } from '../../models/captcha.model';

@Component({
  selector: 'app-result',
  templateUrl: './result-component.html',
  styleUrls: ['./result-component.css']
})
export class ResultComponent {
  private readonly CURRENT_STAGE = 6;
  constructor(private router: Router, private state: CaptchaStateService) {}

  ngOnInit() {
    if (!this.state.canAccessStage(this.CURRENT_STAGE)) {
      this.router.navigate([`/captcha${this.state.getProgress()}`]);
      return;
    }

  }
  restartChallenge() {
    this.state.resetProgress();
    this.router.navigate(['/']);
  }
}