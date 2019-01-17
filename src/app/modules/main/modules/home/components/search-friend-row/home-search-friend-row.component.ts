import {Component, Input, OnInit} from '@angular/core';
import {SearchModel} from '../../../../models/search.model';

@Component({
    selector: 'app-home-search-friend-row',
    templateUrl: 'home-search-friend-row.component.html',
    styleUrls: ['home-search-friend-row.component.scss']
})
export class HomeSearchFriendRowComponent implements OnInit {

    @Input()
    search: SearchModel;

    ngOnInit(): void {
    }
}
