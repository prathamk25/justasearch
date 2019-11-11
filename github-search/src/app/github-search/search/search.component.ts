import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { GithubSearchService } from 'src/app/github-search.service';
import { IUserResult } from '../iuser-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [GithubSearchService]
})
export class SearchComponent implements OnInit {
  searchResult: IUserResult;
  searchSubscription: Subscription;
  constructor(private searchService: GithubSearchService) {
  }

  ngOnInit() {
  }

  onSearchChanged() {
    this.searchSubscription = this.searchService.fetchUsers()
      .subscribe(results => {
        this.searchResult = results;
        if (this.searchSubscription) {
          this.searchSubscription.unsubscribe();
        }
      });
  }

}
