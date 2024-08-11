import { Component, Input, OnInit } from '@angular/core';
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
import {
  WebcamImage,
  WebcamInitError,
  WebcamModule
} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-webcam-snapshot',
  standalone: true,
  imports: [
    WebcamModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './webcam-snapshot.component.html',
  styleUrl: './webcam-snapshot.component.scss',
})
export class WebcamSnapshotComponent implements OnInit {
  @Input()
  public parentForm: FormArray | undefined;

  // toggle webcam on/off
  public showWebcam = true;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 1090 },
    height: { ideal: 576 },
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage | null = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  public webcamSnapshotFormGroup: FormGroup;
  public webcamSnapshotFormControl: FormControl;
  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.webcamSnapshotFormControl = this.formBuilder.control(
      '',
      Validators.required
    );

    this.webcamSnapshotFormGroup = this.formBuilder.group({
      webcamSnapShot: this.webcamSnapshotFormControl,
    });
    if (this.parentForm) {
      const parent = this.parentForm;
      Promise.resolve(undefined)
        .then(() => {
          parent.push(this.webcamSnapshotFormGroup);
        })
        .catch((error: Error) => {
          console.log(`error occurred ${JSON.stringify(error)}`);
        });
    }
  }

  public takePicture(): void {
    this.trigger.next();
  }

  public clearPicture(): void {
    this.webcamImage = null;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.webcamSnapshotFormControl.patchValue(webcamImage.imageAsDataUrl);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
