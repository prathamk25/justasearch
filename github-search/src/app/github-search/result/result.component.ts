import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IUserResult } from '../iuser-result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {
  @Input() searchResult: IUserResult;

  pageSize = 10;
  page = 1;

  constructor() { }

  ngOnInit() {
  }

}
