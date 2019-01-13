import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {User} from '../../../models/user.model';
import {environment} from '../../../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    loadUsers(groupId?: number) {
        let params = new HttpParams();
        if (groupId !== undefined) {
            params = params.set('groupId', `${groupId}`);
        }
        return this.http.get<CommonResponseModel<User[]>>(environment.getHttpUrl(`v1/users`), {
            params,
            withCredentials: true
        });
    }
}