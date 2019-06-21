import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {Group} from '../models/group.model';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class GroupService {
    url = environment.getHttpUrl('v1/groups');
    constructor(private http: HttpService) {}

    /**
     * 查找当前用户群组列表
     */
    loadGroups() {
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'groups'
        });
    }

    post(body): Observable<Group> {
        return this.http.postOfUser({
            apiBase: 'v1',
            resourceName: 'groups',
            body
        });
    }
}
