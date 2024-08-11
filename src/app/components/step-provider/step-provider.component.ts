import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { PdfService } from '../../services/pdf.service';
import {
  Consent,
  TattooWaiverService,
} from '../../services/tattoo-waiver.service';
import { AgreementComponent } from '../agreement/agreement.component';
import { HealthIssuesComponent } from '../health-issues/health-issues.component';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import {
  PreviewComponent,
  PreviewComponentDataInterface,
} from '../preview/preview.component';
import { SignaturePadComponent } from '../signature-pad/signature-pad.component';
import { StepComponent } from '../step/step.component';
import { WebcamSnapshotComponent } from '../webcam-snapshot/webcam-snapshot.component';

@Component({
  selector: 'app-step-provider',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    StepComponent,
    HealthIssuesComponent,
    AgreementComponent,
    PersonalDataComponent,
    SignaturePadComponent,
    WebcamSnapshotComponent,
    PreviewComponent,
  ],
  templateUrl: './step-provider.component.html',
  styleUrl: './step-provider.component.scss',
})
export class StepProviderComponent {
  public isLinear = true;

  public stepperFormGroup: FormGroup;
  public stepperFormArray: FormArray;
  public consents: Consent[];
  public disclaimer: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tattooWaiverService: TattooWaiverService,
    private readonly router: Router,
    private readonly matSnackBar: MatSnackBar,
    private readonly pdfService: PdfService,
    private readonly dialog: MatDialog
  ) {
    this.disclaimer = this.tattooWaiverService.getDisclaimer();
    this.consents = this.tattooWaiverService.getConsents();
    this.stepperFormArray = this.formBuilder.array([]);

    this.stepperFormGroup = this.formBuilder.group({
      stepperFormArray: this.stepperFormArray,
    });
  }

  public displayPreview(): void {
    const formValues = this.stepperFormArray.getRawValue();
    const customerName = this.pdfService.getCustomerName(formValues);
    this.pdfService
      .generatePdf(formValues)
      .pipe(first())
      .subscribe((pdfFile) => {
        const data: PreviewComponentDataInterface = {
          customerName,
          pdfFile,
        };

        this.dialog.open(PreviewComponent, {
          data,
          height: 'calc(100% - 30px)',
          width: 'calc(100% - 30px)',
          maxWidth: '100%',
          maxHeight: '100%',
        });
      });
  }

  public cancelConsent(): void {
    this.matSnackBar.open('Consent has been aborted', 'X', { duration: 2000 });
    this.router.navigate(['/main']);
  }
}
