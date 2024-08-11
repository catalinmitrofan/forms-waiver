import { Injectable } from '@angular/core';
import type { Template } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { barcodes, image, text } from '@pdfme/schemas';
import { from, map, Observable } from 'rxjs';
import * as tattooConsentTemplate from '../assets/data/tattoo-consent.json';
import { DateHelperUtilities } from '../helper/date-helper-utilities';

@Injectable({ providedIn: 'root' })
export class PdfService {
  public tattooTemplate: Template = tattooConsentTemplate;
  constructor() {}

  public generatePdf(data: any[]): Observable<Blob> {
    const pdfFormFields = this.getInputValues(data);

    const template = this.tattooTemplate;
    const inputs = [pdfFormFields];

    return from(
      generate({
        template,
        inputs,
        plugins: {
          text,
          image,
          qrcode: barcodes.qrcode,
        },
      })
    ).pipe(
      map((pdf) => {
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        return blob;
      })
    );
  }

  public getCustomerName(data: any[]): string {
    const pdfFormFields = this.getInputValues(data);
    const customerName = pdfFormFields.name;

    return customerName;
  }
  private getInputValues(data: any[]): PdfFormFields {
    const recordedValues = Object.assign({}, ...data) as AppFormFields;

    const pdfFormFields = this.convertAppFormFieldsToPdfFields(recordedValues);
    return pdfFormFields;
  }

  private convertAppFormFieldsToPdfFields(
    appFormFields: AppFormFields
  ): PdfFormFields {
    return {
      ...appFormFields,
      zip: appFormFields.zip.toString(),
      currentDate: DateHelperUtilities.formatDateToUS(new Date()),
      dateOfBirth: DateHelperUtilities.formatDateToUS(
        new Date(appFormFields.dateOfBirth)
      ),
    };
  }
}

export interface AppFormFields {
  sterile: string;
  healing: string;
  touchUps: string;
  settle: string;
  allergies: string;
  design: string;
  responsibility: string;
  healthIssues: string;
  healthIssuesInitials: string;
  artist: string;
  bodyLocation: string;
  name: string;
  pronoun: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  approvedDesign: string;
  spellingCheck: string;
  signaturePad: string;
  webcamSnapShot: string;
}

export interface PdfFormFields extends Omit<AppFormFields, 'zip'> {
  currentDate: string;
  zip: string;
}
