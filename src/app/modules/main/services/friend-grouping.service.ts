import {Injectable} from '@angular/core';
import {CommonResponseModel} from '../../../models/common-response.model';
import {FriendGrouping} from '../models/friend-grouping.model';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class FriendGroupingService {

    url = environment.getHttpUrl('v1/friendGroupings');

    constructor(private http: HttpService) {}

    /**
     * 查找当前用户好友分组列表
     */
    findFriendGroupings() {
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'friendGroupings'
        });
    }

    addFriendGrouping(name: string) {
        return this.http.postOfUser({
            apiBase: 'v1',
            resourceName: 'friendGroupings',
            body: {name}
        });
    }

    deleteFriendGrouping(resourceId: number) {
        return this.http.deleteOfUser({
            apiBase: 'v1',
            resourceName: 'friendGroupings',
            resourceId
        });
    }

    updateFriendGrouping(resourceId: number, body: {
        sort?: number,
        name?: string,
        visible?: boolean,
        stealth?: boolean
    }) {
        return this.http.patchOfUser({
            apiBase: 'v1',
            resourceName: 'friendGroupings',
            resourceId,
            body
        });
    }
}
