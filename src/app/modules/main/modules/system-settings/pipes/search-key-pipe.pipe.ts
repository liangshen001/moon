import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchKeyPipe'
})
export class SearchKeyPipePipe implements PipeTransform {

    transform(value: any[], key): any {
        value.slice();
        return key ? value.filter(item => item.value.includes(key)).slice(0, 5) : [];
    }

}
