import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {environment} from '../../../../environments/environment';
import {FriendMessage} from '../models/friend-message.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class FriendMessageService {
    constructor(private http: HttpClient) {}

    loadFriendMessages(friendId: number, offset: number) {
        const params = new HttpParams()
            .append('friendId', `${friendId}`)
            .append('offset', `${offset}`);
        return this.http.get<CommonResponseModel<FriendMessage[]>>(environment.getHttpUrl(`v1/friendMessages`), {
            params,
            withCredentials: true
        }).pipe(map(res => res.data));
    }

    sendFriendMessage(friendId: number, content: string): Observable<FriendMessage> {
        return this.http.post<CommonResponseModel<FriendMessage>>(environment.getHttpUrl(`v1/friendMessages`), {
            content, friendId
        }, {withCredentials: true}).pipe(map(res => res.data));
    }
}