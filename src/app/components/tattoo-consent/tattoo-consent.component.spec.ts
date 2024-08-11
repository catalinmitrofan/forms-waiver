import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TattooConsentComponent } from './tattoo-consent.component';

describe('TattooConsentComponent', () => {
  let component: TattooConsentComponent;
  let fixture: ComponentFixture<TattooConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TattooConsentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TattooConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
