export namespace Constants {
  export enum FormType {
    PIERCING = 'Piercing',
    TATTOO = 'Tattoo',
  }

  export interface Consent {
    consent: string;
    label: string;
    fieldName: string;
  }
}
