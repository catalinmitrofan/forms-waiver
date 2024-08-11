import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { catchError, first, of } from 'rxjs';
import * as emailConfig from '../assets/data/email-config.json';
import * as mailGunData from '../assets/data/mail-gun.json';
import { DateHelperUtilities } from '../helper/date-helper-utilities';

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(private readonly http: HttpClient) {}

  public sendEmail(user: string, file?: Blob): void {
    const headers = this.buildEmailHeaders();
    const email = this.buildEmail(user, file);
    const url = this.getEmailUrl();

    this.http
      .post(url, email, { headers })
      .pipe(
        first(),
        catchError((error) => {
          console.log(`error occured ${error}`);
          return of(undefined);
        })
      )
      .subscribe((result) => {
        console.log(`returned result ${result}`);
      });
  }

  private buildEmailHeaders(): HttpHeaders {
    const encryptedApiKey = mailGunData.enc;
    var bytes = crypto.AES.decrypt(encryptedApiKey, 'agker');
    var apiKey = bytes.toString(crypto.enc.Utf8);

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(apiKey)}`,
    });

    return headers;
  }

  private buildEmail(user: string, file?: Blob): FormData {
    const formData = new FormData();
    formData.append('from', `${user} <${emailConfig.sender}>`);
    formData.append('to', `${emailConfig.receiver}`);
    formData.append('subject', `${emailConfig.subject} ${user}`);
    formData.append('text', `${emailConfig.emailContent} ${user}!`);

    if (file) {
      const date = DateHelperUtilities.formatDateToUS(new Date());
      const fileName = `${user}-${date.replaceAll('/', '-')}.pdf`;
      console.log(fileName);
      formData.append('attachment', file, fileName);
    }

    return formData;
  }

  private getEmailUrl(): string {
    const url = `https://api.mailgun.net/v3/${mailGunData.domain}/messages`;
    return url;
  }
}
