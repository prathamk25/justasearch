import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { IUserResult } from '../iuser-result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {
  @Input() searchResult: IUserResult;

  pageSize = 3;
  page = 1;
  showDetails = false;

  constructor() { }

  ngOnInit() {
  }

  onShowDetails(item: IUserResult){
    this.showDetails = !this.showDetails;
  }

}
