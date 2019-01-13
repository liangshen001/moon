import {Pipe, PipeTransform} from '@angular/core';
import {AddStatus} from '../../../enums/add-status';

@Pipe({
    name: 'addStatusPipe'
})
export class AddStatusPipe implements PipeTransform {
    transform(status: AddStatus, isFriend, isSender: boolean): any {
        if (status === AddStatus.AGREE) {
            return isFriend ? (isSender ? '已同意并添加为好友' : '已同意') : '';
        } else if (status === AddStatus.IGNORE) {
            return isFriend ? (isSender ? '等待验证' : '已忽略') : '';
        } else if (status === AddStatus.REJECT) {
            return isFriend ? (isSender ? '已拒绝你的请求' : '已拒绝') : '';
        } else if (status === AddStatus.WAITING && isSender) {
            return isFriend ? ('等待验证') : '';
        }
        throw new Error('添加状态出错');
    }
}
