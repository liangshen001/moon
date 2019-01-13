import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {GroupSystemMessage} from '../models/group-system-message';
import {CommonResponseModel} from '../../../models/common-response.model';

@Injectable()
export class GroupSystemMessageService {
    resources = environment.getHttpUrl('v1/groupSystemMessages');

    constructor(private httpClient: HttpClient) {
    }

    loadGroupSystemMessages() {
        return this.httpClient.get<CommonResponseModel<GroupSystemMessage[]>>(this.resources,
            {withCredentials: true}).pipe(map(res => res.data));
    }
}
