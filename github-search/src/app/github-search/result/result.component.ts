import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IUserResult } from '../iuser-result';
import { IUserResultItem } from '../iuser-result-item';
import { GithubSearchService } from 'src/app/github-search.service';
import { Subscription } from 'rxjs';
import { IRepoItem } from '../irepo-item';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  @Input() searchResult: IUserResult;

  pageSize = 3;
  page = 1;
  repoSubscription: Subscription;
  repoResult: {[id: number]: IRepoItem[]} = {};

  constructor(private service: GithubSearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onShowDetails(item: IUserResultItem){    
    if(!item.Selected){
      item.Selected = true;
      this.repoSubscription = this.service.fetchRepos(item.Login).subscribe((result: IRepoItem[]) => {
        this.repoResult[item.Id] = result;
        this.cd.detectChanges();
        if(this.repoSubscription){
          this.repoSubscription.unsubscribe();
        }
      })
    }
    else{
      item.Selected = false;
    }
  }

  ngOnDestroy(){
    this.repoResult = null;
    if(this.repoSubscription){
      this.repoSubscription.unsubscribe();
    }
  }

}
