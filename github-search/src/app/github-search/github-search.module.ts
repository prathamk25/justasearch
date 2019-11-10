import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { GithubSearchRoutingModule } from './github-search-routing.module';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    GithubSearchRoutingModule
  ]
})
export class GithubSearchModule { }
