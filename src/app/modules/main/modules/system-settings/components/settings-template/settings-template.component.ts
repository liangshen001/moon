import {AfterContentInit, Component, ContentChildren, ElementRef, OnInit, QueryList, Renderer2, ViewChild} from '@angular/core';
import {SettingsItemComponent} from '../settings-item/settings-item.component';

@Component({
    selector: 'app-settings-template',
    templateUrl: './settings-template.component.html',
    styleUrls: ['./settings-template.component.scss']
})
export class SettingsTemplateComponent implements AfterContentInit {

    selectTitle: string;

    @ViewChild('scrollContainer')
    scrollContainer: ElementRef<HTMLElement>;

    @ViewChild('bottomDiv')
    bottomDiv: ElementRef<HTMLElement>;

    @ContentChildren(SettingsItemComponent)
    settingsItems: QueryList<SettingsItemComponent>;

    constructor(private renderer: Renderer2) {
    }
    ngAfterContentInit(): void {
        if (this.settingsItems.length) {
            this.selectTitle = this.settingsItems.first.title;
            setTimeout(() => {
                const last = this.settingsItems.last;
                const height = this.scrollContainer.nativeElement.clientHeight - last.element.nativeElement.clientHeight;
                console.log(this.scrollContainer.nativeElement.clientHeight);
                console.log(last.element.nativeElement.clientHeight);
                this.renderer.setStyle(this.bottomDiv.nativeElement, 'height', `${height}px`);
            });
        }
    }

    scroll(event) {
        const selectElement = this.settingsItems.find(({element}) =>
            element.nativeElement.offsetTop + element.nativeElement.offsetHeight > event.srcElement.scrollTop &&
            element.nativeElement.offsetTop <= event.srcElement.scrollTop);
        this.selectTitle = (selectElement.title);
    }

    clickTitle(title: string) {
        console.log(this.selectTitle === title);
        const item = this.settingsItems.find(_item => title === _item.title);
        if (item) {
            this.scrollContainer.nativeElement.scrollTop = item.element.nativeElement.offsetTop;
        }
    }

}
