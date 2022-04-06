import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() sendOutput = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onSearchInput(e: any) {
    this.sendOutput.emit(e.target.value);
  }
}
