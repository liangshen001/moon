import {Injectable} from '@angular/core';
import {CommonResponseModel} from '../../../models/common-response.model';
import {FriendGrouping} from '../models/friend-grouping.model';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class FriendGroupingService {

    url = environment.getHttpUrl('v1/friendGroupings');

    constructor(private http: HttpClient) {}

    /**
     * 查找当前用户好友分组列表
     * @returns {Observable<FriendGrouping[]>}
     */
    findFriendGroupings() {
        return this.http.get<CommonResponseModel<FriendGrouping[]>>(this.url, {withCredentials: true})
            .pipe(map(res => res.data));
    }

    addFriendGrouping(name: string) {
        return this.http.post<CommonResponseModel<FriendGrouping>>(this.url, {
            name
        }, {withCredentials: true}).pipe(map(res => res.data));
    }

    deleteFriendGrouping(id: number) {
        return this.http.delete<CommonResponseModel<FriendGrouping>>(`${this.url}/${id}`, {withCredentials: true})
            .pipe(map(res => res.data));
    }

    updateFriendGrouping(id: number, changes: {
        sort?: number,
        name?: string,
        visible?: boolean,
        stealth?: boolean
    }) {
        return this.http.patch<CommonResponseModel<FriendGrouping>>(`${this.url}/${id}`,
            changes, {withCredentials: true});
    }
}
