import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {Conversation} from '../models/conversation';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ConversationService {
    url = environment.getHttpUrl('v1/conversations');
    constructor(private http: HttpClient) {}

    loadConversations() {
        return this.http.get<CommonResponseModel<Conversation[]>>(this.url, {
            withCredentials: true
        }).pipe(map(res => res.data));
    }

    updateConversation(id: number, changes: {
        unreadCount?: number,
        top?: boolean
    }) {
        return this.http.patch(`${this.url}/${id}`,
            changes, {
            withCredentials: true
        });
    }

    removeConversation(id: number) {
        return this.http.delete(`${this.url}/${id}`, {
            withCredentials: true
        });
    }
}
