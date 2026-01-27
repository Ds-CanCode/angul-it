import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaStateService {

  private storageKey = 'angulit-progress';
  private prefix = 'STAGE:'; 


  saveProgress(stage: number) {
    const value = this.prefix + stage;
    const encrypted = this.rot13(value);
    localStorage.setItem(this.storageKey, encrypted);
  }

  getProgress(): number {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return 1;

    const decrypted = this.rot13(stored);

    if (!decrypted.startsWith(this.prefix)) {
      this.resetProgress();
      return 1;
    }

    const stage = parseInt(decrypted.replace(this.prefix, ''), 10);
    return isNaN(stage) ? 1 : stage;
  }

  canAccessStage(stage: number): boolean {
    return this.getProgress() >= stage;
  }

  resetProgress() {
    localStorage.removeItem(this.storageKey);
  }

  private rot13(text: string): string {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + 13) % 26) + base
      );
    });
  }
}
