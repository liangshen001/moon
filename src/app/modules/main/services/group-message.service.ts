import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {map} from 'rxjs/operators';
import {GroupMessage} from '../models/group-message.model';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class GroupMessageService {
    constructor(private http: HttpService) {}


    loadGroupMessages(groupId: number, offset: number) {
        const params = new HttpParams()
            .append('groupId', `${groupId}`)
            .append('offset', `${offset}`);
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'groupMessages',
            params
        });
    }

    sendGroupMessage(groupId: number, content: string) {
        return this.http.postOfUser({
            apiBase: 'v1',
            resourceName: 'groupMessages',
            body: {content, groupId}
        });
    }
}