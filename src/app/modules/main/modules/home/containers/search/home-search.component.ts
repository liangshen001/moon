import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SearchModel} from '../../../../models/search.model';
import {ChatType} from '../../../../enums/chat-type';

@Component({
  selector: 'app-home-search-friend',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {

  privateSearchs: SearchModel[];
  groupSearchs: SearchModel[];
  groupChatType: ChatType.GROUP;
  privateChatType: ChatType.FRIEND;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe((params) => {
    //   this.httpClient.get<CommonResponseModel<SearchModel[]>>(`http://${ environment.domain }/chat/search/findPrivateSearchs?key=${ params['key'] }`)
    //     .subscribe(res => this.privateSearchs = res.data);
    //   this.httpClient.get<CommonResponseModel<SearchModel[]>>(`http://${ environment.domain }/chat/search/findGroupSearchs?key=${ params['key'] }`)
    //     .subscribe(res => this.groupSearchs = res.data);
    // });
  }

  isHidden(searchs: SearchModel[]): boolean {
    return !searchs || searchs.length === 0;
  }

}
