import { Injectable } from '@angular/core';
import * as tattooWaiver from '../assets/data/tattoo-waiver.json';
import { Constants } from '../helper/constants';

@Injectable({ providedIn: 'root' })
export class TattooWaiverService {
  public getConsents(): Constants.Consent[] {
    return tattooWaiver.consents;
  }
  public getDisclaimer(): string {
    return tattooWaiver.disclaimer;
  }
}
