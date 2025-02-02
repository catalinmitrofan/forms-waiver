import { Component, Input, OnInit } from '@angular/core';
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
import { TattooWaiverService } from '../../services/tattoo-waiver.service';
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
import { Constants } from '../../helper/constants';
import { PiercingWaiverService } from '../../services/piercing-waiver.service';

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
  ],
  templateUrl: './step-provider.component.html',
  styleUrl: './step-provider.component.scss',
})
export class StepProviderComponent implements OnInit {
  @Input() type: Constants.FormType;

  public isLinear = true;

  public stepperFormGroup: FormGroup;
  public stepperFormArray: FormArray;
  public consents: Constants.Consent[];
  public disclaimer: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tattooWaiverService: TattooWaiverService,
    private readonly piercingWaiverService: PiercingWaiverService,
    private readonly router: Router,
    private readonly matSnackBar: MatSnackBar,
    private readonly pdfService: PdfService,
    private readonly dialog: MatDialog
  ) {
    this.stepperFormArray = this.formBuilder.array([]);

    this.stepperFormGroup = this.formBuilder.group({
      stepperFormArray: this.stepperFormArray,
    });
  }

  public ngOnInit(): void {
    if (this.type === Constants.FormType.PIERCING) {
      this.disclaimer = this.piercingWaiverService.getDisclaimer();
      this.consents = this.piercingWaiverService.getConsents();
    } else {
      this.disclaimer = this.tattooWaiverService.getDisclaimer();
      this.consents = this.tattooWaiverService.getConsents();
    }
  }

  public displayPreview(): void {
    const formValues = this.stepperFormArray.getRawValue();
    const customerName =
      this.type === Constants.FormType.PIERCING
        ? this.pdfService.getPiercingCustomerName(formValues)
        : this.pdfService.getTattooCustomerName(formValues);

    const pdfFile$ =
      this.type === Constants.FormType.PIERCING
        ? this.pdfService.generatePiercingPdf(formValues)
        : this.pdfService.generateTattooPdf(formValues);

    pdfFile$.pipe(first()).subscribe((pdfFile) => {
      const data: PreviewComponentDataInterface = {
        customerName,
        pdfFile,
        consentType: this.type,
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
