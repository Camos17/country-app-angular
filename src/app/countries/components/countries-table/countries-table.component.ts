import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './countries-table.component.html',
  styleUrl: './countries-table.component.scss'
})
export class CountriesTableComponent {

  @Input() public countries: Country[] = [];

}
