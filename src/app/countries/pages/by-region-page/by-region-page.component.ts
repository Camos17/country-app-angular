import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.sass'
})
export class ByRegionPageComponent {

  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  onSearchByRegion(term: string): void {
    this.countriesService.searchRegion(term).subscribe(data => this.countries = data);
  }

}
