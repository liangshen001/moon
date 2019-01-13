import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../../../models/user.model';
import {CommonResponseModel} from '../../../../models/common-response.model';
import {Observable} from 'rxjs';

@Injectable()
export class LookupService {

    constructor(private http: HttpClient) {}

    findUserPage(): Observable<User[]> {
        return this.http.get<CommonResponseModel<User[]>>(`api/lookupUsers`)
            .pipe(map(res => res.data));
    }

    addFriend(userId: number) {
        return this.http.post<CommonResponseModel<Object>>(`api/friends`, {
            id: new Date().getTime(),
            userId
        }).pipe(map(res => res.data));
    }
}
