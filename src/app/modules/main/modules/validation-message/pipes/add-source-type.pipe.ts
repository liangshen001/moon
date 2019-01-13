import {Pipe, PipeTransform} from '@angular/core';
import {AddSourceType} from '../../../enums/add-source-type';

@Pipe({
    name: 'addSourceTypePipe'
})

export class AddSourceTypePipe implements PipeTransform {
    transform(addSourceType: AddSourceType): any {
        if (addSourceType === AddSourceType.LOOKUP) {
            return '来自账号查找';
        } else {
            throw new Error();
        }
    }
}