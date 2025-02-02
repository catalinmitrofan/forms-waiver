import { Injectable } from '@angular/core';
import * as piercingWaiver from '../assets/data/piercing-waiver.json';
import { Constants } from '../helper/constants';

@Injectable({
  providedIn: 'root',
})
export class PiercingWaiverService {
  public getConsents(): Constants.Consent[] {
    return piercingWaiver.consents;
  }
  public getDisclaimer(): string {
    return piercingWaiver.disclaimer;
  }
}
