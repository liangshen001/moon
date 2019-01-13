import {Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {Subscription} from 'rxjs';
import {NgxRowService} from './ngx-row.service';

@Directive({
    selector: '[ngxRow]'
})
export class NgxRowDirective implements OnInit, OnDestroy {

    @Input()
    rowGroupName: string;

    @Input()
    focusable = true;

    @Input()
    selected: boolean;

    @Output()
    selectedChange = new EventEmitter<boolean>();

    @Input()
    focusedColor = '#E6E6E6';

    @Input()
    passColor = 'F0F0F0';

    backgroundColor: string;

    private _sub: Subscription;

    constructor(private element: ElementRef,
                private rowService: NgxRowService) {
    }

    ngOnInit(): void {
        this.element.nativeElement.setAttribute('tabindex', -1);
        this.element.nativeElement.style.outline = 0;
        this.backgroundColor = this.element.nativeElement.style.backgroundColor;
        if (this.focusable) {
            this._sub = this.rowService.subscribe(this.rowGroupName).subscribe(ele => {
                if (ele === this.element) {
                    this.element.nativeElement.style.backgroundColor = '#E6E6E6';
                    this.selected = true;
                    this.selectedChange.emit(this.selected);
                } else {
                    this.element.nativeElement.style.backgroundColor = this.backgroundColor;
                    this.selected = false;
                    this.selectedChange.emit(this.selected);
                }
            });
        }
    }
    ngOnDestroy(): void {
        if (this.focusable) {
            this._sub.unsubscribe();
        }
    }

    @HostListener('focus')
    focus() {
        if (this.focusable) {
            this.rowService.selectElement(this.rowGroupName, this.element);
        }
    }

    @HostListener('mouseenter')
    mouseenter() {
        if (!this.selected) {
            this.element.nativeElement.style.backgroundColor = '#F0F0F0';
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        if (!this.selected) {
            this.element.nativeElement.style.backgroundColor = this.backgroundColor;
        }
    }
}
