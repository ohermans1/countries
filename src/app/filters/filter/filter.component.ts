import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  menuOpen: boolean = false;
  selectedRegion!: string;
  constructor() {}

  @Output() sendRegion = new EventEmitter<string>();

  @HostListener('document:click', ['$event']) closeDropdown(
    $event: MouseEvent
  ) {
    const target = ($event.target as Element).classList.contains(
      'filterToggle'
    );
    if (!target) {
      this.menuOpen = false;
    } else {
      this.menuOpen = !this.menuOpen;
    }
  }

  selectOption(data: any) {
    if (data === 'Filter by region...') {
      this.selectedRegion = data;
    } else {
      this.selectedRegion = data.target.innerText;
    }
    this.sendRegion.emit(this.selectedRegion);
  }

  ngOnInit(): void {
    console.log(this.selectedRegion);
    if (this.selectedRegion === undefined) {
      this.selectedRegion = 'Filter by region...';
    }
  }
}
