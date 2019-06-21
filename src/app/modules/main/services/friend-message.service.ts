import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {environment} from '../../../../environments/environment';
import {FriendMessage} from '../models/friend-message.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class FriendMessageService {
    constructor(private http: HttpService) {}

    loadFriendMessages(friendId: number, offset: number) {
        const params = new HttpParams()
            .append('friendId', `${friendId}`)
            .append('offset', `${offset}`);
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'friendMessages',
            params
        });
    }

    sendFriendMessage(friendId: number, content: string): Observable<FriendMessage> {
        return this.http.postOfUser({
            apiBase: 'v1',
            resourceName: 'friendMessages',
            body: {friendId, content}
        });
    }
}