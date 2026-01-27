import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Captcha5 } from './captcha-5';

describe('Captcha5', () => {
  let component: Captcha5;
  let fixture: ComponentFixture<Captcha5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Captcha5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Captcha5);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
