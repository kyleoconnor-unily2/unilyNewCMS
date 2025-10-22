import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'extendexampleExclamationMark'
})
export class ExclamationMarkPipe implements PipeTransform {
    transform(value: string): string {
        return `${value}!`;
    }
}
