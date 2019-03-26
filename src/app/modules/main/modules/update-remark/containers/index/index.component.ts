import {Component, OnInit} from '@angular/core';
import {ChatType} from '../../../../enums/chat-type';
import {select, Store} from '@ngrx/store';
import {UpdateUserFriend} from '../../../../actions/user-friend.actions';
import {UpdateUserGroup} from '../../../../actions/user-group.action';
import {ActivatedRoute} from '@angular/router';
import {getUserFriendEntities, getUserGroupEntities} from '../../../../reducers';
import {filter, map, take} from 'rxjs/operators';
import {NgxElectronService} from '../../../../../../../../projects/ngx-electron/core/src/lib/services/ngx-electron.service';
import {ElectronWindowService} from '../../../../../../services/electron-window.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    remark: string;
    chatType: ChatType;
    id: number;

    constructor(private activatedRoute: ActivatedRoute,
                private electronService: NgxElectronService,
                private electronWindowService: ElectronWindowService,
                private store$: Store<any>) {
    }

    ngOnInit() {
        this.chatType = +this.activatedRoute.snapshot.params.chatType;
        this.id = +this.activatedRoute.snapshot.params.id;
        if (this.chatType === ChatType.FRIEND) {
            this.store$.pipe(
                select(getUserFriendEntities),
                filter(entities => !!entities && !!entities[this.id]),
                take(1),
            ).subscribe(entities => this.remark = entities[this.id].remark);
        } else {
            this.store$.pipe(
                select(getUserGroupEntities),
                filter(entities => !!entities && !!entities[this.id]),
                take(1),
            ).subscribe(entities => this.remark = entities[this.id].remark);
        }
    }

    cancel() {
        this.electronService.remote.getCurrentWindow().close();
    }

    confirm() {
        const payload = {
            id: this.id,
            changes: {
                remark: this.remark
            }
        };
        this.store$.dispatch(this.chatType === ChatType.FRIEND ?
            new UpdateUserFriend(payload) : new UpdateUserGroup(payload));
    }

}
