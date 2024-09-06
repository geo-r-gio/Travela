import { Injectable, signal, WritableSignal } from '@angular/core';
import { Country } from '@features/countries/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: WritableSignal<Country[]> = signal([]);

  addFavorite(country: Country): void {
    this.favorites.update((favorites) => [...favorites, country]);
  }

  removeFavorite(country: Country): void {
    this.favorites.update((favorites) => {
      return favorites.filter(fav => fav.name.common !== country.name.common)
    });
  }

  isFavorite(country: Country): boolean {
    return this.favorites().some(fav => fav.name.common === country.name.common);
  }

  getFavorites() {
    return this.favorites.asReadonly();
  }
}
