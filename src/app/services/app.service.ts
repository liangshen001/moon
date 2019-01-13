import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
import {LoginUser} from '../modules/auth/models/login-user.model';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../models/common-response.model';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    url = environment.getHttpUrl(`v1/auth`);

    constructor(private http: HttpClient) {}

    login({account, password, onlineStatus}: LoginUser) {
        return this.http.post<CommonResponseModel<User>>(this.url, {
            account, password, onlineStatus
        }, {withCredentials: true});
    }

    logout() {
        return this.http.delete<CommonResponseModel<User>>(this.url, {
            withCredentials: true
        });
    }
}
