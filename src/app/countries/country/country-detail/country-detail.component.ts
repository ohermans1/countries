import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Country } from '../country.model';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit, OnChanges {
  @Input() countryDetails!: Array<Country>;
  @Input() countryCodes!: Array<Object>;
  @Output() close = new EventEmitter();
  borderCountries = [];
  fullNameBorderCountries: Array<string> = [];
  hasBorderCountries = true;
  constructor() {}

  closeDetails() {
    this.close.emit();
  }

  ngOnInit(): void {
    this.setBorderCountries();
  }

  ngOnChanges(): void {
    this.setBorderCountries();
  }

  setBorderCountries() {
    this.borderCountries = this.countryDetails[0].borderCountries;
    if (this.borderCountries === undefined) {
      this.hasBorderCountries = false;
      return;
    }
    this.fullNameBorderCountries = [];
    this.borderCountries.forEach((element: any) => {
      let countryCode = element;
      this.countryCodes.forEach((element: any) => {
        if (element.code === countryCode) {
          this.fullNameBorderCountries.push(element['name']);
        }
      });
    });
    if (this.fullNameBorderCountries.length === 0) {
      this.hasBorderCountries = false;
      return;
    }
  }

  @Output() sendBorderCountry = new EventEmitter();
  onBorderClick(data: any) {
    this.sendBorderCountry.emit(data.target.value);
  }
}
