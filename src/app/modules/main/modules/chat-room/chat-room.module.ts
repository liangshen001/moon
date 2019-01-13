import {NgModule} from '@angular/core';
import {ChatRoomRoutingModule} from './chat-room-routing.module';
import {VirtualScrollModule} from 'angular2-virtual-scroll';
// import {EmojiPickerModule} from 'ng-emoji-picker';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {components} from './components';
import {containers} from './containers';
import {services} from './services';
import {QuillModule} from 'ngx-quill';
import {CommonModule} from '@angular/common';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {NgxRowModule} from 'ngx-row';
import {NgxElementResizableModule} from 'ngx-element-resizable';
import {FormsModule} from '@angular/forms';
import {NgxMessageEditorModule} from 'ngx-message-editor';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChatRoomRoutingModule,
        VirtualScrollModule,
        MatButtonModule,
        MatIconModule,
        PickerModule,
        QuillModule,
        // StoreModule.forFeature('chatRoom', reducers),
        // EffectsModule.forFeature(effects),
        // 'ng-emoji-picker': '^1.2.1',
        // EmojiPickerModule,
        TranslateModule,
        NgxRowModule,
        NgxElementResizableModule,
        NgxMessageEditorModule,
        NgxElectronCoreModule,
        NgxElectronDataModule
    ],
    providers: [
        ...services
    ],
    declarations: [
        ...containers,
        ...components
    ]
})
export class ChatRoomModule {
}
