import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IUserResult } from './github-search/iuser-result';
import { IUserResultItem } from './github-search/iuser-result-item';
import { Subject } from 'rxjs';
import { ISortItem } from './github-search/isort-item';
import { IRepoItem } from './github-search/irepo-item';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {
  searchChanged$ = new Subject<string>();
  constructor(private http: HttpClient) {
  }

  fetchUsers() {
    return this.searchChanged$.pipe(debounceTime(500),
    distinctUntilChanged(),
    switchMap(text => this.searchUsers(text)));
  }

  fetchRepos(user: string){
    return this.http.get(this.generateUserSearchUrl(null, user)).pipe(
      map(result => {
        return this.mapRepoResult(result);
      })
    );
  }

  getSortResult(records: IUserResultItem[], sortValue: ISortItem){
    return records.sort((val1, val2) => {
      let comparison = 0;
      if(val1[sortValue.Value] > val2[sortValue.Value]){
        comparison = 1;
      }
      else if(val1[sortValue.Value] < val2[sortValue.Value]){
        comparison = -1;
      }
      return sortValue.Order === 'desc' ? (comparison * -1) : comparison;      
    })
  }

  getSortValues(): ISortItem[]{
    return [
      {
        Name: 'Select Sort',
        Class: '',
        Value: '',
        Order: ''
      },
      {
        Name: 'Sort By Name',
        Class: 'sort-asc',
        Value: 'Login',
        Order: 'asc'
      },
      {
        Name: 'Sort By Name',
        Class: 'sort-desc',
        Value: 'Login',
        Order: 'desc'
      },
      {
        Name: 'Sort By Score',
        Class: 'sort-asc',
        Value: 'Score',
        Order: 'asc'
      },
      {
        Name: 'Sort By Score',
        Class: 'sort-desc',
        Value: 'Score',
        Order: 'desc'
      }
    ]
  }  

  private searchUsers(searchText: string) {
    return this.http.get(this.generateUserSearchUrl(searchText)).pipe(
      map(result => {
        return this.mapResult(result);
      })
    );
  }  

  private generateUserSearchUrl(searchText: string, user: string = null): string {
    if(user){
      return `https://api.github.com/users/${user}/repos`
    }
    return `https://api.github.com/search/users?q=${searchText}`;
  }  

  private mapResult(result: any): IUserResult {
    return {
      TotalCount: result.total_count,
      Items: this.mapResultItems(result.items)
    };
  }

  private mapResultItems(items: any[]) {
    return items.map((item: any): IUserResultItem => ({
      Id: item.id,
      Login: item.login,
      Avatar: item.avatar_url,
      Type: item.type,
      Score: item.score,
      Url: item.url,
      Selected: false
    }));
  }  

  private mapRepoResult(result: any){
    return result.map((repoItem): IRepoItem => ({
      Name: repoItem.name,
      Description: repoItem.description,
      Language: repoItem.language
    }))

  }
}
