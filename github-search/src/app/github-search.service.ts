import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IUserResult } from './github-search/iuser-result';
import { IUserResultItem } from './github-search/iuser-result-item';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {
  searchApi = `https​:​//api.github.com/search/users?q=pk`;
  searchChanged$ = new Subject<string>();
  constructor(private http: HttpClient) {
  }

  fetchUsers() {
    return this.searchChanged$.pipe(debounceTime(500),
    distinctUntilChanged(),
    switchMap(text => this.searchUsers(text)));
  }

  searchUsers(searchText: string) {
    return this.http.get(this.generateUserSearchUrl(searchText)).pipe(
      map(result => {
        return this.mapResult(result);
      })
    );
  }

  generateUserSearchUrl(searchText: string): string {
    return `https://api.github.com/search/users?q=${searchText}`;
  }

  mapResult(result: any): IUserResult {
    return {
      TotalCount: result.total_count,
      Items: this.mapResultItems(result.items)
    };
  }

  mapResultItems(items: any[]) {
    return items.map((item: any): IUserResultItem => ({
      Id: item.id,
      Login: item.login,
      Avatar: item.avatar_url,
      Type: item.type,
      Score: item.score,
      Url: item.url
    }));
  }
}
