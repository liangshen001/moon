import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChangeEvent} from 'angular2-virtual-scroll';
import {ChatType} from '../../../../enums/chat-type';
import {ChatMessage} from '../../../../models/chat-message.model';
import {NgxElectronService} from '@ngx-electron/core';

@Component({
    selector: 'app-chat-room-main',
    templateUrl: 'chat-room-main.component.html',
    styleUrls: ['chat-room-main.component.scss']
})
export class ChatRoomMainComponent implements OnInit, AfterViewChecked {
    friendChat = ChatType.FRIEND;

    @Input()
    messages: ChatMessage[];

    @Input()
    type: ChatType;

    @Output()
    send = new EventEmitter<string>();

    @Output()
    shake = new EventEmitter<object>();

    @Output()
    resend = new EventEmitter<number>();

    // @ViewChild(VirtualScrollComponent)
    // friend virtualScroll: VirtualScrollComponent;

    closable = true;

    isShowPopup: boolean;

    messageContent = '';

    constructor(private electronService: NgxElectronService) {}

    ngOnInit(): void {
    }

    ngAfterViewChecked(): void {
        // console.log(this.messageScroll.nativeElement.scrollTop);
        // this.messageScroll.nativeElement.scrollTop = this.messageScroll.nativeElement.scrollHeight;
    }

    setPopupAction(a) {

    }

    onListChange($event: ChangeEvent) {

    }
    onSendMessage() {
        if (this.messageContent) {
            this.send.emit(this.messageContent);
            this.messageContent = '';
        }
        // console.log(`isScalar: ${this.shake._isScalar}, ${this.shake.__isAsync}, ${this.shake.closed}, ${this.shake.isStopped}`);
        // this.shake.emit();
        // this.sendMessage.emit(this.messageContent);
        // this.messageContent = '';
    }
    resendMessage(id: number) {
        this.resend.emit(id);
    }

    addEmoji($event: any) {
        this.messageContent += $event.emoji.native;
        this.closable = true;
        this.isShowPopup = false;

    }
    openPopup() {
        this.isShowPopup = !this.isShowPopup;
    }

    closePopup() {
        this.isShowPopup = !this.closable;
    }

    shotScreen() {
        this.electronService.ipcRenderer.send('shot-screen');
    }

    addBr() {
        this.messageContent += '<br>';
    }
}
