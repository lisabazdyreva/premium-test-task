import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBeer } from '../types/beer';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  currentPage = 1;

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
}
