import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {GroupSystemMessage} from '../models/group-system-message';
import {CommonResponseModel} from '../../../models/common-response.model';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class GroupSystemMessageService {

    constructor(private httpClient: HttpClient,
                private http: HttpService) {
    }

    loadGroupSystemMessages() {
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'groupSystemMessages'
        });
    }
}
