import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Consent } from '../../services/tattoo-waiver.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-step',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
})
export class StepComponent implements OnInit, OnDestroy {
  @Input()
  public consent: Consent;

  @Input()
  public parentForm: FormArray | undefined;

  public stepFormGroup: FormGroup;
  public stepFormControl: FormControl;
  private destroyTrigger = new Subject<void>();
  public disableNextButton = true;

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.stepFormControl = this.formBuilder.control('', Validators.required);
    this.stepFormGroup = this.formBuilder.group({
      [this.consent.fieldName]: this.stepFormControl,
    });

    if (this.parentForm) {
      const parent = this.parentForm;
      Promise.resolve(undefined)
        .then(() => {
          parent.push(this.stepFormGroup);
        })
        .catch((error: Error) => {
          console.log(`error occurred ${JSON.stringify(error)}`);
        });
    }

    this.stepFormGroup.statusChanges
      .pipe(takeUntil(this.destroyTrigger))
      .subscribe((status) => {
        this.disableNextButton = status !== 'VALID';
      });
  }

  public ngOnDestroy(): void {
    this.destroyTrigger.next();
  }
}
