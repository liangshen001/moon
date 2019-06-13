import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, pluck} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {FriendValidation} from '../models/friend-validation';
import {CommonResponseModel} from '../../../models/common-response.model';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class FriendValidationService {

    constructor(private httpClient: HttpClient,
                private http: HttpService) {
    }

    loadFriendValidations() {
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'friendValidations'
        });
    }
}
