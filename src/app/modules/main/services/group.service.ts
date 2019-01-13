import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {Group} from '../models/group.model';
import {map} from 'rxjs/operators';

@Injectable()
export class GroupService {
    url = environment.getHttpUrl('v1/groups');
    constructor(private http: HttpClient) {}

    /**
     * 查找当前用户群组列表
     * @returns {Observable<Group>}
     */
    loadGroups() {
        return this.http.get<CommonResponseModel<Group[]>>(this.url, {withCredentials: true})
            .pipe(map(res => res.data));
    }

    post(body): Observable<Group> {
        return this.http.post<CommonResponseModel<Group>>(this.url, body,  {
            withCredentials: true
        }).pipe(map(res => res.data));
    }
}
