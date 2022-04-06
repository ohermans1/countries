import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { DataService } from './data.service';
import { Country } from './country/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnChanges {
  constructor(private dataService: DataService) {}
  countriesServer = [];
  countriesArray: Country[] = [];
  filteredArray: Country[] = [];
  recievedCountry: Country[] = [];
  countryCodes = [{}];
  clickedBorderCountry: string = '';
  @Input() setRegion: string = 'Filter by region...';
  @Input() setSearch: string = '';

  ngOnInit(): void {
    this.dataService.sendGetRequest().subscribe((data: any) => {
      this.countriesServer = data;

      for (let el in this.countriesServer) {
        if (this.countriesServer[el]['name']['common'] === undefined) {
          continue;
        }
        if (this.countriesServer[el]['languages'] === undefined) {
          continue;
        }
        if (this.countriesServer[el]['languages'] === undefined) {
          continue;
        }
        if (this.countriesServer[el]['currencies'] === undefined) {
          continue;
        }
        if (
          this.countriesServer[el]['flags']['svg'] ===
          'https://flagcdn.com/ad.svg'
        ) {
          continue;
        }

        let languageCode = Object.keys(
          this.countriesServer[el]['languages']
        )[0];
        let currencyCode = Object.keys(
          this.countriesServer[el]['currencies']
        )[0];

        if (
          this.countriesServer[el]['name']['nativeName'][languageCode] ===
          undefined
        ) {
          continue;
        }

        let code = {
          code: this.countriesServer[el]['cioc'],
          name: this.countriesServer[el]['name']['common'],
        };
        this.countryCodes.push(code);

        this.countriesArray.push(
          new Country(
            this.countriesServer[el]['name']['common'],
            this.numberWithCommas(this.countriesServer[el]['population']),
            this.countriesServer[el]['region'],
            this.countriesServer[el]['capital'],
            this.countriesServer[el]['flags']['svg'],
            this.countriesServer[el]['subregion'],
            this.countriesServer[el]['tld'],
            this.countriesServer[el]['languages'][languageCode],
            this.countriesServer[el]['borders'],
            this.countriesServer[el]['name']['nativeName'][languageCode][
              'official'
            ],
            this.countriesServer[el]['currencies'][currencyCode]['name']
          )
        );
      }
      this.countriesServer = [];
    });
    this.filteredArray = this.countriesArray;
  }

  numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  ngOnChanges(): void {
    if (this.setRegion === 'All' || this.setRegion === 'Filter by region...') {
      this.filteredArray = this.countriesArray;
    } else {
      this.filteredArray = this.countriesArray.filter(
        (x) => x.region === this.setRegion
      );
    }

    if (this.setSearch === '') {
    } else {
      let length = this.setSearch.length;
      this.filteredArray = this.filteredArray.filter(
        (x) =>
          x.name.slice(0, length).toLowerCase() === this.setSearch.toLowerCase()
      );
    }
  }

  @Output() sendCountry = new EventEmitter<string>();
  @Output() hideFilter = new EventEmitter<boolean>();
  detailsOpen: boolean = false;
  recieveCountry(data: string) {
    this.recievedCountry = this.filteredArray.filter((x) => x.name === data);
    this.detailsOpen = true;
    this.hideFilter.emit(this.detailsOpen);
  }

  closeDetails() {
    this.detailsOpen = !this.detailsOpen;
    this.hideFilter.emit(this.detailsOpen);
  }

  @Output() sendCountryCodes = new EventEmitter();

  onBorderCountryClicked(data: string) {
    this.recievedCountry = this.filteredArray.filter((x) => x.name === data);
  }
}
