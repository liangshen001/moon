import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {Conversation} from '../models/conversation';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class ConversationService {
    url = environment.getHttpUrl('v1/conversations');
    constructor(private http: HttpService) {}

    loadConversations() {
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'conversations'
        });
    }

    updateConversation(resourceId: number, body: {
        unreadCount?: number,
        top?: boolean
    }) {
        return this.http.patchOfUser({
            apiBase: 'v1',
            resourceName: 'conversations',
            resourceId,
            body
        });
    }

    removeConversation(resourceId: number) {
        return this.http.deleteOfUser({
            apiBase: 'v1',
            resourceName: 'conversations',
            resourceId
        });
    }
}
