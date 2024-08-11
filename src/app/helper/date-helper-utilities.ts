export class DateHelperUtilities {
  public static formatDateToUS(date: Date): string {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);

    return formattedDate;
  }
}
