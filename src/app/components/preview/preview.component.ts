import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    PdfViewerModule,
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  public pdfURL = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PreviewComponentDataInterface,
    private readonly emailService: EmailService,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.pdfURL = URL.createObjectURL(data.pdfFile);
  }

  public submitConsent(): void {
    this.emailService.sendEmail(this.data.customerName, this.data.pdfFile);
    console.log('console')
    this.matSnackBar.open('Consent Forms submitted', 'X', { duration: 2000 });
    this.router.navigate(['/main']);
  }
}

export interface PreviewComponentDataInterface {
  customerName: string;
  pdfFile: Blob;
}
