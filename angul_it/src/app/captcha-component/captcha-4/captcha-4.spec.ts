import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Captcha4 } from './captcha-4';

describe('Captcha4', () => {
  let component: Captcha4;
  let fixture: ComponentFixture<Captcha4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Captcha4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Captcha4);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
