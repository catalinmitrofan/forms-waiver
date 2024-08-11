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
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Subject, takeUntil } from 'rxjs';
import {
  TattooArtist,
  TattooArtistsService,
} from '../../services/tattoo-artists.service';

@Component({
  selector: 'app-agreement',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.scss',
})
export class AgreementComponent implements OnInit, OnDestroy {
  @Input()
  public parentForm: FormArray | undefined;

  public artist = '';
  public location = '';

  public agreementFormGroup: FormGroup;
  public artistFormControl: FormControl;
  public bodyLocationFormControl: FormControl;
  private destroyTrigger = new Subject<void>();
  public disableNextButton = true;

  public tattooArtists: TattooArtist[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tattooArtistsService: TattooArtistsService
  ) {
    this.tattooArtists = this.tattooArtistsService.getTattooArtists();
  }

  public ngOnInit(): void {
    this.artistFormControl = this.formBuilder.control('', Validators.required);
    this.bodyLocationFormControl = this.formBuilder.control(
      '',
      Validators.required
    );
    this.agreementFormGroup = this.formBuilder.group({
      artist: this.artistFormControl,
      bodyLocation: this.bodyLocationFormControl,
    });

    if (this.parentForm) {
      const parent = this.parentForm;
      Promise.resolve(undefined)
        .then(() => {
          parent.push(this.agreementFormGroup);
        })
        .catch((error: Error) => {
          console.log(`error occurred ${JSON.stringify(error)}`);
        });
    }

    this.artistFormControl.valueChanges
      .pipe(takeUntil(this.destroyTrigger))
      .subscribe((value) => {
        this.artist = value;
      });

    this.bodyLocationFormControl.valueChanges
      .pipe(takeUntil(this.destroyTrigger))
      .subscribe((value) => {
        this.location = value;
      });

    this.agreementFormGroup.statusChanges
      .pipe(takeUntil(this.destroyTrigger))
      .subscribe((status) => {
        this.disableNextButton = status !== 'VALID';
      });
  }

  public ngOnDestroy(): void {
    this.destroyTrigger.next();
  }
}
