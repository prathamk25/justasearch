import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {
  searchApi = `https​:​//api.github.com/search/users?q=pk`;
  constructor(private http: HttpClient) { }

  fetchUsers(searchText){
    return this.http.get(this.getUrl());
  }

  getUrl(): string{
    return 'https://api.github.com/search/users?q=pk';
  }
}
