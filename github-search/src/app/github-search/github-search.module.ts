import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { GithubSearchRoutingModule } from './github-search-routing.module';
import {NgbDropdownModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GithubSearchService } from '../github-search.service';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [SearchComponent, ToolbarComponent, ResultComponent],
  imports: [
    CommonModule,
    GithubSearchRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    GithubSearchService
  ]
})
export class GithubSearchModule { }
