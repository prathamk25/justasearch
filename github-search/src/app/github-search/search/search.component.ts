import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GithubSearchService } from 'src/app/github-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [GithubSearchService]
})
export class SearchComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  constructor(private searchService: GithubSearchService) {
  }

  ngOnInit() {
    this.searchService.fetchUsers(this.searchTerm$)
      .subscribe(results => {
        console.log(results);
      });
  }

}
