import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiercingConsentComponent } from './piercing-consent.component';

describe('PiercingConsentComponent', () => {
  let component: PiercingConsentComponent;
  let fixture: ComponentFixture<PiercingConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiercingConsentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiercingConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
