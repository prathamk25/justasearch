import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GithubSearchService } from 'src/app/github-search.service';
import { ISortItem } from '../isort-item';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
  sortValues: ISortItem[];
  selectedSort: string;
  hasSearch: boolean;
  @Output() searchChanged = new EventEmitter();
  @Output() sortChanged = new EventEmitter();

  constructor(private service: GithubSearchService) { }

  ngOnInit() {
    this.sortValues = this.service.getSortValues();
    this.selectedSort = this.sortValues[0].Name;
  }

  onSearchChanged(searchText: string) {
    if (searchText && searchText !== ''){
      this.hasSearch = true;
      this.service.searchChanged$.next(searchText);      
    }
    else{
      this.hasSearch = false;
    }
    this.searchChanged.emit(this.hasSearch);
  }

  onSortChanged(sort: ISortItem){
    this.selectedSort = sort.Name;
    this.sortChanged.emit(sort);
  }

  ngOnDestroy(){
    this.sortValues = null;
  }

}
