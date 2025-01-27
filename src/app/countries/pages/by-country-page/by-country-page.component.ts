import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.sass'
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialSearchValue: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialSearchValue = this.countriesService.cacheStore.byCountries.term;
  }

  onSearchByCountry(term: string): void {
    this.countriesService.searchCountry(term).subscribe( data => this.countries = data );
  }

}
