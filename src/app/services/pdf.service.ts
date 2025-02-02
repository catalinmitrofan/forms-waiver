import { Injectable } from '@angular/core';
import type { Template } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { barcodes, image, text } from '@pdfme/schemas';
import { from, map, Observable } from 'rxjs';
import * as tattooConsentTemplate from '../assets/data/templates/tattoo-consent-template.json';
import * as piercingConsentTemplate from '../assets/data/templates/piercing-consent-template.json';
import { DateHelperUtilities } from '../helper/date-helper-utilities';

@Injectable({ providedIn: 'root' })
export class PdfService {
  public tattooTemplate: Template = tattooConsentTemplate;
  public piercingTemplate: Template = piercingConsentTemplate;
  constructor() {}

  /*
  TATTOO PART
  */
  public generateTattooPdf(data: any[]): Observable<Blob> {
    const pdfFormFields = this.getTattooInputValues(data);
    const template = this.tattooTemplate;
    const inputs = [pdfFormFields];

    return this.generateBlobForPdf(template, inputs);
  }

  public getTattooCustomerName(data: any[]): string {
    const pdfFormFields = this.getTattooInputValues(data);
    const customerName = pdfFormFields.name;

    return customerName;
  }
  private getTattooInputValues(data: any[]): TattooPdfFormFields {
    const recordedValues = Object.assign({}, ...data) as TattooAppFormFields;
    const pdfFormFields =
      this.convertTattooAppFormFieldsToPdfFields(recordedValues);

    return pdfFormFields;
  }

  private convertTattooAppFormFieldsToPdfFields(
    appFormFields: TattooAppFormFields
  ): TattooPdfFormFields {
    return {
      ...appFormFields,
      zip: appFormFields.zip.toString(),
      currentDate: DateHelperUtilities.formatDateToUS(new Date()),
      dateOfBirth: DateHelperUtilities.formatDateToUS(
        new Date(appFormFields.dateOfBirth)
      ),
    };
  }

  /*
  PIERCING PART
  */
  public generatePiercingPdf(data: any[]): Observable<Blob> {
    const pdfFormFields = this.getPiercingInputValues(data);
    const template = this.piercingTemplate;
    const inputs = [pdfFormFields];

    return this.generateBlobForPdf(template, inputs);
  }

  public getPiercingCustomerName(data: any[]): string {
    const pdfFormFields = this.getPiercingInputValues(data);
    const customerName = pdfFormFields.name;

    return customerName;
  }

  private getPiercingInputValues(data: any[]): PiercingPdfFormFields {
    const recordedValues = Object.assign({}, ...data) as PiercingAppFormFields;
    const pdfFormFields =
      this.convertPiercingAppFormFieldsToPdfFields(recordedValues);

    return pdfFormFields;
  }

  private convertPiercingAppFormFieldsToPdfFields(
    appFormFields: PiercingAppFormFields
  ): PiercingPdfFormFields {
    return {
      ...appFormFields,
      zip: appFormFields.zip.toString(),
      currentDate: DateHelperUtilities.formatDateToUS(new Date()),
      dateOfBirth: DateHelperUtilities.formatDateToUS(
        new Date(appFormFields.dateOfBirth)
      ),
    };
  }

  /*
  GENERIC functions
  */
  private generateBlobForPdf(
    template: Template,
    inputs: any[]
  ): Observable<Blob> {
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
}

export interface PiercingAppFormFields extends CommonAppFormFields {
  recommendations: string;
  touching: string;
  placement: string;
  infection: string;
}

export interface TattooAppFormFields extends CommonAppFormFields {
  touchUps: string;
  settle: string;
  design: string;
  responsibility: string;
  spellingCheck: string;
}

export interface CommonAppFormFields {
  sterile: string;
  healing: string;
  allergies: string;
  pregnancy: string;
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
  signaturePad: string;
  webcamSnapShot: string;
}

export interface TattooPdfFormFields extends Omit<TattooAppFormFields, 'zip'> {
  currentDate: string;
  zip: string;
}

export interface PiercingPdfFormFields
  extends Omit<PiercingAppFormFields, 'zip'> {
  currentDate: string;
  zip: string;
}
