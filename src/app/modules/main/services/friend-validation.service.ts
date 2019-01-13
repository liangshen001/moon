import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, pluck} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {FriendValidation} from '../models/friend-validation';
import {CommonResponseModel} from '../../../models/common-response.model';

@Injectable()
export class FriendValidationService {

    resources = environment.getHttpUrl('v1/friendValidations');

    constructor(private httpClient: HttpClient) {
    }

    loadFriendValidations() {
        return this.httpClient.get<CommonResponseModel<FriendValidation[]>>(this.resources,
            {withCredentials: true}).pipe(map(res => res.data));
    }
}
