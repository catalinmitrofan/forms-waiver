import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-health-issues',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './health-issues.component.html',
  styleUrl: './health-issues.component.scss',
})
export class HealthIssuesComponent implements OnInit, OnDestroy {
  @Input()
  public parentForm: FormArray | undefined;

  public healthIssuesFormGroup: FormGroup;
  public healthIssuesFormControl: FormControl;
  public healthIssuesInitialsFormControl: FormControl;
  private destroyTrigger = new Subject<void>();
  public disableNextButton = true;

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.healthIssuesFormControl = this.formBuilder.control('');
    this.healthIssuesInitialsFormControl = this.formBuilder.control(
      '',
      Validators.required
    );
    this.healthIssuesFormGroup = this.formBuilder.group({
      healthIssues: this.healthIssuesFormControl,
      healthIssuesInitials: this.healthIssuesInitialsFormControl,
    });

    if (this.parentForm) {
      const parent = this.parentForm;
      Promise.resolve(undefined)
        .then(() => {
          parent.push(this.healthIssuesFormGroup);
        })
        .catch((error: Error) => {
          console.log(`error occurred ${JSON.stringify(error)}`);
        });
    }

    this.healthIssuesFormGroup.statusChanges
      .pipe(takeUntil(this.destroyTrigger))
      .subscribe((status) => {
        this.disableNextButton = status !== 'VALID';
      });
  }
  public ngOnDestroy(): void {
    this.destroyTrigger.next();
  }
}
