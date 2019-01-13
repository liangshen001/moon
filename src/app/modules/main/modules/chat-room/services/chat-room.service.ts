import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChatRoomService {

    constructor(private http: HttpClient) {}

}
