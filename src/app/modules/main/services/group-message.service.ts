import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {map} from 'rxjs/operators';
import {GroupMessage} from '../models/group-message.model';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class GroupMessageService {
    constructor(private http: HttpClient) {}


    loadGroupMessages(groupId: number, offset: number) {
        const params = new HttpParams()
            .append('groupId', `${groupId}`)
            .append('offset', `${offset}`);
        return this.http.get<CommonResponseModel<GroupMessage[]>>(
            environment.getHttpUrl(`v1/groupMessages`), {
                params,
                withCredentials: true
            }).pipe(map(res => res.data));
    }

    sendGroupMessage(groupId: number, content: string) {
        return this.http.post<CommonResponseModel<GroupMessage>>(environment.getHttpUrl(`v1/groupMessages`), {
            content, groupId
        }, {withCredentials: true}).pipe(map(res => res.data));
    }
}