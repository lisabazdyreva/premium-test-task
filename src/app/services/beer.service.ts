import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBeer } from '../types/beer';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  currentPage = 1;
  favoriteBeers: IBeer[] = [];
  constructor(private http: HttpClient) {}

  fetchBeers() {
    return this.http.get<IBeer[]>('https://api.punkapi.com/v2/beers', {
      params: { page: this.currentPage, per_page: 5 },
    });
  }

  fetchAllBeers() {
    return this.http.get<IBeer[]>('https://api.punkapi.com/v2/beers');
  }

  fetchBeer(id: number) {
    return this.http.get<IBeer[]>(`https://api.punkapi.com/v2/beers/${id}`);
  }

  public setPage(value: number) {
    this.currentPage = value;
  }

  addFavoriteBeer(beer: IBeer) {
    const isFavorite = this.getIndex(beer) !== -1;

    if (!isFavorite) {
      this.favoriteBeers.push(beer);
    }
  }

  removeFavoriteBeer(beer: IBeer) {
    const index = this.getIndex(beer);

    if (index !== -1) {
      this.favoriteBeers.splice(index, 1);
    }
  }

  getIndex(beer: IBeer) {
    return this.favoriteBeers.findIndex(
      (favoriteBeer) => favoriteBeer.id === beer.id
    );
  }

  getFavoriteBeers() {
    return this.favoriteBeers;
  }
}
