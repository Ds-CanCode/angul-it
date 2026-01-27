import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Captcha3 } from './captcha-3';

describe('Captcha3', () => {
  let component: Captcha3;
  let fixture: ComponentFixture<Captcha3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Captcha3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Captcha3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
