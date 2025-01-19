import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Country } from "../interfaces/country.interface";
import { catchError, filter, map, Observable, of, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(
        private http: HttpClient,
        private toastr: ToastrService
    ) {}

    private getCountriesRequest(url: string, successMsg?: string, errorMsg?: string): Observable<Country[]> {
        return this.http.get<Country[]>(url).pipe(
            filter(data => !!data),
            tap(data => {
                this.toastr.success(`${successMsg}`);
                return data;
            }),
            catchError( () => {
                this.toastr.error(`Error en la búsqueda, ${errorMsg}`);
                return of([])
            })
        );
    }

    searchCountryById( id: string ): Observable<Country | null> {
        return this.http.get<Country[] | null>(`${this.apiUrl}/alpha/${id}`).pipe(
            filter(countries => !!countries),
            map(countries => countries && countries.length > 0 ? countries[0] : null),
            tap(data => {
                if (data) this.toastr.success('Se ha encontrado un país');
                return data;
            }),
            catchError(() => {
                this.toastr.error('Código incorrecto o id de pías incorrecto');
                return of(null)
            })
        );
    }

    searchCapital( term: string ): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url, 'Búsqueda correcta', 'capital incorrecta');
    }

    searchCountry( term: string ): Observable<Country[]>  {
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountriesRequest(url, 'Búsqueda correcta', 'país incorrecto');
    }

    searchRegion( region: string ): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`;
        return this.getCountriesRequest(url, 'Búsqueda correcta', 'región incorrecto');
    }

}