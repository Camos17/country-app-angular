import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.sass'
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  onSearchByCapital( term: string ): void {
    console.log('Search term ', { term });
    this.countriesService.searchCapital(term).subscribe(data => {
      console.log('data country ', data);
      this.countries = data;
    });
  }

}
