import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unilyFuturesExclamationMark'
})
export class ExclamationMarkPipe implements PipeTransform {
    transform(value: string): string {
        return `${value}!`;
    }
}
