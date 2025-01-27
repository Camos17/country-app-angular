import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.sass'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading = false;
  public initialSearchValue = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialSearchValue = this.countriesService.cacheStore.byCapital.term;
  }

  onSearchByCapital( term: string ): void {
    console.log('Search term ', { term });
    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe(data => {
      console.log('data country ', data);
      this.countries = data;
      this.isLoading = false;
    });
  }

}
