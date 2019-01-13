import {Pipe} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
    name: 'sendTime'
})
export class SendTimePipe extends DatePipe {


    transform(value: number): any {

        const now = new Date();
        const sendTime = new Date(value);
        let format: string;
        if (now.toDateString() === sendTime.toDateString()) {
            format = 'hh:mm';
        } else if (now.getFullYear() === sendTime.getFullYear()) {
            format = 'MM-dd';
        } else {
            format = 'yyyy';
        }
        return super.transform(value, format);
    }

}
