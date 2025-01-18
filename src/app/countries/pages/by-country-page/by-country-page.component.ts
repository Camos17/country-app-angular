import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.sass'
})
export class ByCountryPageComponent {

  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  onSearchByCountry(term: string): void {
    this.countriesService.searchCountry(term).subscribe( data => this.countries = data );
  }

}
