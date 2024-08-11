import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Subject, takeUntil } from 'rxjs';
import { USState, USStatesService } from '../../services/us-states.service';

@Component({
  selector: 'app-personal-data',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.scss',
})
export class PersonalDataComponent implements OnInit, OnDestroy {
  @Input()
  public parentForm: FormArray | undefined;

  public personalDataFormGroup: FormGroup;

  public nameFormControl: FormControl;
  public pronounFormControl: FormControl;
  public phoneFormControl: FormControl;
  public dateOfBirthFormControl: FormControl;
  public addressFormControl: FormControl;
  public cityFormControl: FormControl;
  public stateFormControl: FormControl;
  public zipFormControl: FormControl;
  public designApprovalFormControl: FormControl;
  public spellingApprovalFormControl: FormControl;

  private destroyTrigger = new Subject<void>();
  public disableNextButton = true;

  public stateList: USState[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly usStateService: USStatesService
  ) {
    this.stateList = this.usStateService.getUSStates();
  }

  public ngOnInit(): void {
    this.nameFormControl = this.formBuilder.control('', Validators.required);
    this.pronounFormControl = this.formBuilder.control('', Validators.required);
    this.phoneFormControl = this.formBuilder.control('', Validators.required);
    this.dateOfBirthFormControl = this.formBuilder.control(
      '',
      Validators.required,
  
    );
    this.addressFormControl = this.formBuilder.control('', Validators.required);
    this.cityFormControl = this.formBuilder.control('', Validators.required);
    this.stateFormControl = this.formBuilder.control('', [Validators.required]);
    this.zipFormControl = this.formBuilder.control('', Validators.required);
    this.designApprovalFormControl = this.formBuilder.control(
      '',
      Validators.required
    );

    this.spellingApprovalFormControl = this.formBuilder.control(
      '',
      Validators.required
    );

    this.personalDataFormGroup = this.formBuilder.group({
      name: this.nameFormControl,
      pronoun: this.pronounFormControl,
      phone: this.phoneFormControl,
      dateOfBirth: this.dateOfBirthFormControl,
      address: this.addressFormControl,
      city: this.cityFormControl,
      state: this.stateFormControl,
      zip: this.zipFormControl,
      approvedDesign: this.designApprovalFormControl,
      spellingCheck: this.spellingApprovalFormControl,
    });

    if (this.parentForm) {
      const parent = this.parentForm;
      Promise.resolve(undefined)
        .then(() => {
          parent.push(this.personalDataFormGroup);
        })
        .catch((error: Error) => {
          console.log(`error occurred ${JSON.stringify(error)}`);
        });
    }

    this.personalDataFormGroup.statusChanges
      .pipe(takeUntil(this.destroyTrigger))
      .subscribe((status) => {
        this.disableNextButton = status !== 'VALID';
      });
  }

  public ngOnDestroy(): void {
    this.destroyTrigger.next();
  }
}
