import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../service/captcha-state.service';

interface CaptchaImage {
  id: string;
  url: string;
  isCorrect: boolean;
}

interface CaptchaChallenge {
  instruction: string;
  images: CaptchaImage[];
  correctAnswers: string[];
}

@Component({
  selector: 'app-captcha-4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './captcha-4.html',
  styleUrl: './captcha-4.css',
})
export class Captcha4 {

  private readonly CURRENT_STAGE = 4;

  @Input() challenge?: CaptchaChallenge;

  selectedImages = new Set<string>();
  isValidating = false;
  showResult = false;
  isSuccess = false;

  defaultChallenge: CaptchaChallenge = {
    instruction: 'Select all images containing cats',
    images: [
      { id: 'cat-1', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', isCorrect: true },
      { id: 'dog-1', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', isCorrect: false },
      { id: 'dog-2', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', isCorrect: false },
      { id: 'cat-2', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', isCorrect: true },
      { id: 'dog-3', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', isCorrect: false },
      { id: 'cat-3', url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce', isCorrect: true },
      { id: 'cat-4', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', isCorrect: true },
      { id: 'dog-4', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', isCorrect: false },
      { id: 'cat-5', url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce', isCorrect: true },
    ],
    correctAnswers: ['cat-1', 'cat-2', 'cat-3', 'cat-4', 'cat-5']
  };

  constructor(
    private router: Router,
    private state: CaptchaStateService
  ) { }

  ngOnInit() {
    if (!this.state.canAccessStage(this.CURRENT_STAGE)) {
      this.router.navigate([`/captcha${this.state.getProgress()}`]);
      return;
    }

    if (!this.challenge) {
      this.challenge = this.defaultChallenge;
    }

    this.challenge.images = this.shuffleArray(this.challenge.images);
  }

  isSelected(imageId: string): boolean {
    return this.selectedImages.has(imageId);
  }

  getImageClass(imageId: string): string {
    const classes = ['gallery-item'];

    if (this.isSelected(imageId)) {
      classes.push('selected');
    }

    if (this.showResult) {
      const image = this.challenge?.images.find(i => i.id === imageId);
      if (image) {
        if (this.isSelected(imageId)) {
          classes.push(image.isCorrect ? 'correct' : 'incorrect');
        }
        else if (image.isCorrect) {
          classes.push('missed');
        }
      }
    }

    return classes.join(' ');
  }

  toggleSelection(imageId: string) {
    if (this.isValidating || this.showResult) return;

    this.isSelected(imageId)
      ? this.selectedImages.delete(imageId)
      : this.selectedImages.add(imageId);
  }

  validateCaptcha() {
    if (this.state.canAccessStage(this.CURRENT_STAGE + 1)) {
      this.router.navigate([`/captcha${this.state.getProgress()}`]);
      return;
    }

    if (!this.challenge || this.selectedImages.size === 0) return;

    this.isValidating = true;

    const correctAnswers = new Set(this.challenge.correctAnswers);
    const userAnswers = Array.from(this.selectedImages);

    this.isSuccess =
      correctAnswers.size === userAnswers.length &&
      userAnswers.every(ans => correctAnswers.has(ans));

    this.showResult = true;
    this.isValidating = false;

    if (this.isSuccess) {
      this.state.saveProgress(this.CURRENT_STAGE + 1);
      this.router.navigate([`/captcha${this.CURRENT_STAGE + 1}`]);
    }

   
  }



  resetCaptcha() {
    this.selectedImages.clear();
    this.showResult = false;
    this.isSuccess = false;
    this.isValidating = false;
  }

  goBack() {
    this.router.navigate([`/captcha${this.CURRENT_STAGE - 1}`]);
  }


  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
}
