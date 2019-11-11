import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { GithubSearchService } from 'src/app/github-search.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  @Output() searchChanged = new EventEmitter();

  constructor(private service: GithubSearchService) { }

  ngOnInit() {
  }

  onSearchChanged(searchText: string) {
    if (searchText && searchText !== ''){
      this.service.searchChanged$.next(searchText);
      this.searchChanged.emit('');
    }
  }

}
