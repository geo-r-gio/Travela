import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';
import { Country } from '@features/countries/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http : HttpClient) { }

  getAllCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.apiUrl}all`)
  }

  getCountryByName(name: string): Observable<Country>{
    return this.http.get<Country[]>(`${environment.apiUrl}name/${name}`).pipe(
      map(([res]) => res));
  }

  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}alpha?codes=${codes.join(',')}`)
  }
}
