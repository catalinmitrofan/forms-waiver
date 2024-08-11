import { Injectable } from '@angular/core';
import * as tattooWaiver from '../assets/data/tattoo-waiver.json';

@Injectable({ providedIn: 'root' })
export class TattooWaiverService {
  public getConsents(): Consent[] {
    return tattooWaiver.consents;
  }
  public getDisclaimer(): string {
    return tattooWaiver.disclaimer;
  }
}

export interface Consent {
  consent: string;
  label: string;
  fieldName: string;
}
