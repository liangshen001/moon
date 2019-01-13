import {ElementRef, Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable()
export class NgxRowService {

    subjectMap: Map<string, Subject<ElementRef>>;

    constructor() {
        this.subjectMap = new Map<string, Subject<ElementRef>>();
    }

    subscribe(wrName: string) {
        let subject: Subject<ElementRef> = this.subjectMap.get(wrName);
        if (!subject) {
            subject = new Subject<ElementRef>();
            this.subjectMap.set(wrName, subject);
        }
        return subject;
    }

    selectElement(wrName: string, ele: ElementRef) {
        this.subjectMap.get(wrName).next(ele);
    }
}
