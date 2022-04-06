import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './UI/header/header.component';
import { SearchComponent } from './filters/search/search.component';
import { FilterComponent } from './filters/filter/filter.component';
import { CountryComponent } from './countries/country/country.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryDetailComponent } from './countries/country/country-detail/country-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    FilterComponent,
    CountryComponent,
    CountriesComponent,
    CountryDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatIconModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
