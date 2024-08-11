import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { HomeScreenService } from '../../services/home-screen.service';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent {
  public homeScreenText: string;
  constructor(
    private readonly homeScreenService: HomeScreenService,
    private readonly router: Router,
    private readonly emailService: EmailService
  ) {
    this.homeScreenText = this.homeScreenService.getHomeScreenText();
  }

  public openPiercingWaiver(): void {
    console.log('openPiercingWaiver');
  }

  public openTattooWaiver(): void {
    console.log('openTattooWaiver');
    this.router.navigate(['/tattoo']);
  }
}
