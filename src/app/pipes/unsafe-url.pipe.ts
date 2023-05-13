import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Pipe({
  name: 'unsafeUrl',
})
export class UnsafeUrlPipe implements PipeTransform {
  constructor(private _dom: DomSanitizer) {}

  transform(value: string): SafeResourceUrl {
    return this._dom.bypassSecurityTrustResourceUrl(value);
  }
}
