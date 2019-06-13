import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {User} from '../../../models/user.model';
import {environment} from '../../../../environments/environment';
import {select, Store} from '@ngrx/store';
import {getUser} from '../../../reducers';
import {map, switchMap, take} from 'rxjs/operators';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class UserService {
    constructor(private http: HttpService,
                private store$: Store<User>) {}

    loadUsers() {
        return this.http.getOfUser<User[]>({
            apiBase: 'v1',
            resourceName: 'users'
        });
    }
}