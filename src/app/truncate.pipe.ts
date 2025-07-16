import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    wordLimit: number = 6,
    charLimit: number = 12
  ): string {
    if (!value) return '';

    // Split the string into words
    let words = value.split(' ');

    // Truncate words longer than charLimit
    words = words.map((word) =>
      word.length > charLimit ? word.slice(0, charLimit) + '...' : word
    );

    // Limit the number of words to wordLimit
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }

    return words.join(' '); // Join words and return
  }
}
