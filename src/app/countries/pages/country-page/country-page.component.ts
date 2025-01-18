import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.sass'
})
export class CountryPageComponent implements OnInit {

  country?: Country | null = null;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService 
  ) {}

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    const countryId = params['id'] ? params['id'] : null;
    console.log('countryId ', countryId);

    if(!countryId) return;
    this.getCountryById(countryId);
  }

  getCountryById(countryId: string): void {
    this.countriesService.searchCountryById(countryId).subscribe( country => {
      if(!country) this.router.navigate(['']);
      this.country = country;
    });
  }

}
