import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-basic-settings',
    templateUrl: './basic-settings.component.html',
    styleUrls: ['./basic-settings.component.scss']
})
export class BasicSettingsComponent implements OnInit {

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

}
