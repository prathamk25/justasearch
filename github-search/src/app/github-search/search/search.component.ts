import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GithubSearchService } from 'src/app/github-search.service';
import { IUserResult } from '../iuser-result';
import { ISortItem } from '../isort-item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [GithubSearchService]
})
export class SearchComponent implements OnInit, OnDestroy {
  searchResult: IUserResult;
  searchSubscription: Subscription;
  constructor(private searchService: GithubSearchService) {
  }

  ngOnInit() {
  }

  onSearchChanged(hasSearch: boolean) {
    if(hasSearch){
      this.searchSubscription = this.searchService.fetchUsers()
        .subscribe(results => {
          this.searchResult = results;
          if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
          }
        });
    }
    else{
      this.searchResult = null;
    }
  }

  onSortChanged(sortValue: ISortItem){
    if(this.searchResult){
      this.searchResult.Items = this.searchService.getSortResult(this.searchResult.Items, sortValue);
    }
  }

  ngOnDestroy(){
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchResult = null;
  }

}
