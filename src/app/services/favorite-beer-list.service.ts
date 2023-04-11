import { Injectable } from '@angular/core';
import { IBeer } from '../types/beer';

@Injectable({
  providedIn: 'root',
})
export class FavoriteBeerListService {
  private _favoriteBeerList: IBeer[] = [];
  constructor() {}

  public getFavoriteBeerList() {
    return this._favoriteBeerList;
  }

  public setInitialFavoriteBeerList(beers: IBeer[]) {
    this._favoriteBeerList = beers;
  }

  public addFavoriteBeer(beer: IBeer) {
    const isFavorite = this.getBeerIndex(beer) !== -1;

    if (!isFavorite) {
      this._favoriteBeerList.push(beer);
    }
  }

  public removeFavoriteBeer(beer: IBeer) {
    const index = this.getBeerIndex(beer);

    if (index !== -1) {
      this._favoriteBeerList.splice(index, 1);
    }
  }

  public clearFavoriteBeerList() {
    this._favoriteBeerList = [];
  }

  public getBeerIndex(beer: IBeer) {
    const index = this._favoriteBeerList.findIndex(
      (favoriteBeer) => favoriteBeer.id === beer.id
    );
    return index;
  }
}
