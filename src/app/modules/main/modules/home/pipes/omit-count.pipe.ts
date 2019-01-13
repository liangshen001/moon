import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'omitCount'
})
export class OmitCountPipe implements PipeTransform {
    transform(value: number): any {
        if (value > 99) {
            return '99+'
        }
        return value;
    }

}
