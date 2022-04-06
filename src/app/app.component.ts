import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'countries';
  region: string = 'Filter by region...';
  search: string = '';
  detailsOpen: boolean = false;
  darkMode: boolean = false;

  toggleLightDark(data: any) {
    this.darkMode = data;
  }

  @HostBinding('style.--color-el') get getElColor() {
    if (this.darkMode) {
      return 'hsl(209, 23%, 22%)';
    } else {
      return 'hsl(0, 0%, 100%)';
    }
  }
  @HostBinding('style.--color-bg') get getBgColor() {
    if (this.darkMode) {
      return 'hsl(207, 26%, 17%)';
    } else {
      return 'hsl(0, 0%, 98%)';
    }
  }
  @HostBinding('style.--color-txt') get getTxtColor() {
    if (this.darkMode) {
      return 'hsl(0, 0%, 100%)';
    } else {
      return 'hsl(200, 15%, 8%)';
    }
  }

  hideFilter(data: boolean) {
    this.detailsOpen = data;
  }

  recieveRegion(data: string) {
    this.region = data;
  }
  recieveSearch(data: string) {
    this.search = data;
  }
}
