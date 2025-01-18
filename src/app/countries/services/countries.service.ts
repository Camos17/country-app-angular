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
        return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`).pipe(
            filter(data => !!data),
            tap(data => {
                this.toastr.success('Búsqueda correcta');
                return data;
            }),
            catchError( error => {
                this.toastr.error('Error en la búsqueda, capital incorrecta');
                return of([])
            })
        );
    }

    searchCountry( term: string ): Observable<Country[]>  {
        return this.http.get<Country[]>(`${this.apiUrl}/name/${term}`).pipe(
            filter(data => !!data),
            tap(data => {
                if(data) this.toastr.success('Búsqueda correcta')
            }),
            catchError( () => {
                this.toastr.error('Error en la búsqueda, país incorrecto');
                return of([]);
            })
        );
    }

    searchRegion( region: string ): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`).pipe(
            filter(data => !!data),
            tap(data => {
                if(data) this.toastr.success('Búsqueda correcta');
            }),
            catchError( () => {
                this.toastr.error('Error en la búsqueda, región incorrecto');
                return of([])
            })
        );
    }

}