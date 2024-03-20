import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'safeHtml', standalone: true })
export class SafeHtmlPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}
  transform = (value: string | SafeValue | null) => {
    return this.sanitizer.bypassSecurityTrustHtml(value as string);
  };
}
