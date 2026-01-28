import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface CaptchaImage {
  id: string;
  url: string;
  label: string;
  isCorrect: boolean;
}

interface CaptchaChallenge {
  instruction: string;
  images: CaptchaImage[];
  correctAnswers: string[];
}

@Component({
  selector: 'app-captcha-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './captcha-2.html',
  styleUrl: './captcha-2.css',
})

export class Captcha2 {
  @Input() challenge?: CaptchaChallenge;
  @Output() onValidate = new EventEmitter<boolean>();
  @Output() onBack = new EventEmitter<void>();

  selectedImages: Set<string> = new Set();
  isValidating = false;
  showResult = false;
  isSuccess = false;

  // Données de démonstration par défaut
  defaultChallenge: CaptchaChallenge = {
    instruction: 'Sélectionnez toutes les images contenant des chats',
    images: [
      {
        id: 'cat-1',
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop',
        label: 'Feline Friends',
        isCorrect: true
      },
      {
        id: 'dog-1',
        url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop',
        label: 'Canine Companions',
        isCorrect: false
      },
      {
        id: 'dog-2',
        url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop',
        label: 'Feathered Friends',
        isCorrect: false
      },
      {
        id: 'cat-2',
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop',
        label: 'Curious Cat',
        isCorrect: true
      },
      {
        id: 'dog-3',
        url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop',
        label: 'Small Mammals',
        isCorrect: false
      },
      {
        id: 'cat-3',
        url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800&auto=format&fit=crop',
        label: 'Playful Kitten',
        isCorrect: true
      }
    ],
    correctAnswers: ['cat-1', 'cat-2', 'cat-3']
  };

  ngOnInit() {
    // Utiliser le challenge fourni ou le challenge par défaut
    if (!this.challenge) {
      this.challenge = this.defaultChallenge;
    }
  }

  toggleSelection(imageId: string) {
    if (this.isValidating || this.showResult) return;

    if (this.selectedImages.has(imageId)) {
      this.selectedImages.delete(imageId);
    } else {
      this.selectedImages.add(imageId);
    }
  }

  isSelected(imageId: string): boolean {
    return this.selectedImages.has(imageId);
  }

  validateCaptcha() {
    if (this.selectedImages.size === 0 || !this.challenge) {
      return;
    }

    this.isValidating = true;

    // Simuler une validation avec délai
    setTimeout(() => {
      const correctAnswers = new Set(this.challenge!.correctAnswers);
      const selectedArray = Array.from(this.selectedImages);

      // Vérifier si toutes les réponses sélectionnées sont correctes
      // et si toutes les réponses correctes ont été sélectionnées
      const allSelectedAreCorrect = selectedArray.every(id => correctAnswers.has(id));
      const allCorrectAreSelected = this.challenge!.correctAnswers.every(id =>
        this.selectedImages.has(id)
      );

      this.isSuccess = allSelectedAreCorrect && allCorrectAreSelected;
      this.showResult = true;
      this.isValidating = false;

      // Émettre le résultat
      setTimeout(() => {
        this.onValidate.emit(this.isSuccess);

        // Réinitialiser après succès
        if (this.isSuccess) {
          setTimeout(() => {
            this.resetCaptcha();
          }, 1500);
        }
      }, 1000);
    }, 800);
  }

  resetCaptcha() {
    this.selectedImages.clear();
    this.showResult = false;
    this.isSuccess = false;
    this.isValidating = false;
  }

  goBack() {
    this.onBack.emit();
  }

  getImageClass(imageId: string): string {
    const classes = ['gallery-item'];

    if (this.isSelected(imageId)) {
      classes.push('selected');
    }

    if (this.showResult) {
      const image = this.challenge?.images.find(img => img.id === imageId);
      if (image) {
        if (this.selectedImages.has(imageId)) {
          classes.push(image.isCorrect ? 'correct' : 'incorrect');
        } else if (image.isCorrect) {
          classes.push('missed');
        }
      }
    }

    return classes.join(' ');
  }

  get canValidate(): boolean {
    return this.selectedImages.size > 0 && !this.isValidating && !this.showResult;
  }
}
