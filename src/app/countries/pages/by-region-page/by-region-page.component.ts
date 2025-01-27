import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.sass'
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialSearchValue: Region = 'Africa';
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.initialSearchValue = this.countriesService.cacheStore.byRegion.region;
    this.onSearchByRegion(this.initialSearchValue);
  }

  onSearchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe(data => this.countries = data);
  }

}
