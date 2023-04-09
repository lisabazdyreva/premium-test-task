import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBeer } from '../pages/home/home.page';

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

  public setPage(value: number) {
    this.currentPage = value;
  }
}
