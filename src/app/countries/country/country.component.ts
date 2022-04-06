import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Country } from './country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  @Input() country!: Country;
  @Output() sendCountry = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }

  openDetails(e: any) {
    this.sendCountry.emit(e.target.value);
  }
}
