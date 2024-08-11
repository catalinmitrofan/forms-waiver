import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './signature-pad.component.html',
  styleUrl: './signature-pad.component.scss',
})
export class SignaturePadComponent implements OnInit, AfterViewInit {
  @Input()
  public parentForm: FormArray | undefined;

  public disableNextButton = true;
  public signatureNeeded: boolean;
  public signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;
  signatureImg: string;

  public signaturePadFormGroup: FormGroup;
  public signaturePadFormControl: FormControl;

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.signaturePadFormControl = this.formBuilder.control(
      '',
      Validators.required
    );

    this.signaturePadFormGroup = this.formBuilder.group({
      signaturePad: this.signaturePadFormControl,
    });
    if (this.parentForm) {
      const parent = this.parentForm;
      Promise.resolve(undefined)
        .then(() => {
          parent.push(this.signaturePadFormGroup);
        })
        .catch((error: Error) => {
          console.log(`error occurred ${JSON.stringify(error)}`);
        });
    }
  }
  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    this.signaturePad.addEventListener('endStroke', () => {
      this.saveSignature();
    });
  }

  public clearSignature(): void {
    this.signaturePad.clear();
    this.disableNextButton = true;
  }

  public startDrawing(event: Event) {
    // works in device not in browser
  }

  public moved(event: Event) {
    // works in device not in browser
  }

  public saveSignature() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }

    this.signaturePadFormControl.patchValue(base64Data);
    this.disableNextButton = false;
  }
}
