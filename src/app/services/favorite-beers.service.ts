import { Injectable } from '@angular/core';
import { IBeer } from '../types/beer';

@Injectable({
  providedIn: 'root',
})
export class FavoriteBeersService {
  private _favoriteBeers: IBeer[] = [];
  constructor() {}

  addFavoriteBeer(beer: IBeer) {
    const isFavorite = this.getIndex(beer) !== -1;

    if (!isFavorite) {
      this._favoriteBeers.push(beer);
    }
  }

  removeFavoriteBeer(beer: IBeer) {
    const index = this.getIndex(beer);

    if (index !== -1) {
      this._favoriteBeers.splice(index, 1);
    }
  }

  getIndex(beer: IBeer) {
    console.log(this._favoriteBeers);
    return this._favoriteBeers.findIndex(
      (favoriteBeer) => favoriteBeer.id === beer.id
    );
  }

  getFavoriteBeers() {
    return this._favoriteBeers;
  }

  setFavoriteBeersInitial(beers: IBeer[]) {
    console.log('initial');
    this._favoriteBeers = beers;
  }
}
