import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {UserConfig} from '../models/user-config';
import {CommonResponseModel} from '../../../models/common-response.model';
import {ListShowType} from '../enums/list-show-type';
import {FriendNameShowType} from '../enums/friend-name-show-type';
import {FriendListSortType} from '../enums/friend-list-sort-type';
import {ImgShowType} from '../enums/img-show-type';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class UserConfigService {
    url = environment.getHttpUrl('v1/userConfigs');
    constructor(private httpClient: HttpClient,
                private http: HttpService) {
    }

    loadUserConfig(resourceId: number) {
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'userConfigs',
            resourceId
        });
    }

    updateUserConfig(resourceId: number, body: {
        friendImgShowType?: ImgShowType;
        friendSelectedShowBigImg?: boolean;
        friendNameShowType?: FriendNameShowType;
        listShowType?: ListShowType;
        showSimpleFriend?: boolean;
        friendListSortType?: FriendListSortType;
        showOnlineFriend?: boolean;
        showStranger?: boolean;
        showBlackList?: boolean;
        groupImgShowType?: ImgShowType;
        groupSelectedShowBigImg?: boolean;
        background?: string;
        opacity?: number;
        turnOffAllSounds?: boolean;
        closeHeadFlicker?: boolean;
    }) {
        return this.http.patchOfUser({
            apiBase: 'v1',
            resourceName: 'userConfigs',
            resourceId,
            body
        });
    }
}
