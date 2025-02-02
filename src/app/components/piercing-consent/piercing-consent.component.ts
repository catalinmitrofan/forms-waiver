import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StepProviderComponent } from '../step-provider/step-provider.component';
import { Router } from '@angular/router';
import { Constants } from '../../helper/constants';

@Component({
  selector: 'app-piercing-consent',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, StepProviderComponent],
  templateUrl: './piercing-consent.component.html',
  styleUrl: './piercing-consent.component.scss',
})
export class PiercingConsentComponent {
  public type = Constants.FormType.PIERCING;
  constructor(private readonly router: Router) {}

  public navigateHome() {
    this.router.navigate(['/main']);
  }
}
