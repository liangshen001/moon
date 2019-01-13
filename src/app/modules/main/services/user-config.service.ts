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

@Injectable()
export class UserConfigService {
    url = environment.getHttpUrl('v1/userConfigs');
    constructor(private httpClient: HttpClient) {
    }

    loadUserConfig(userConfigId: number) {
        return this.httpClient.get<CommonResponseModel<UserConfig>>(`${this.url}/${userConfigId}`, {withCredentials: true})
            .pipe(map(res => res.data));
    }

    updateUserConfig(userConfigId: number, param: {
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
        return this.httpClient.patch<CommonResponseModel<UserConfig>>(`${this.url}/${userConfigId}`, param,
            {withCredentials: true}).pipe(map(res => res.data));
    }
}
