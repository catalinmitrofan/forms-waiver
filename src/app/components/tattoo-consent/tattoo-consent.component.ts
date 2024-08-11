import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StepProviderComponent } from '../step-provider/step-provider.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tattoo-consent',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, StepProviderComponent],
  templateUrl: './tattoo-consent.component.html',
  styleUrl: './tattoo-consent.component.scss',
})
export class TattooConsentComponent {
  constructor(private readonly router: Router) {}

  public navigateHome() {
    this.router.navigate(['/main']);
  }
}
