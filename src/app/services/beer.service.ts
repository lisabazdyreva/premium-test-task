import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBeer } from '../types/beer';
import { BEER_PER_PAGE, INITIAL_CURRENT_PAGE } from '../utils/const';

// TODO можно ли basic uri запомнить

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  private _currentPage: number = INITIAL_CURRENT_PAGE;

  constructor(private http: HttpClient) {}

  public fetchPageBeer() {
    return this.http.get<IBeer[]>('https://api.punkapi.com/v2/beers', {
      params: { page: this._currentPage, per_page: BEER_PER_PAGE },
    });
  }

  public fetchAllBeer() {
    return this.http.get<IBeer[]>('https://api.punkapi.com/v2/beers');
  }

  public fetchBeer(id: number) {
    return this.http.get<IBeer[]>(`https://api.punkapi.com/v2/beers/${id}`);
  }

  public setCurrentPage(value: number) {
    this._currentPage = value;
  }
}
