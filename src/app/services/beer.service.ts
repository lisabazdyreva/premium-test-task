import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IBeer } from '../types/beer';
import { BASE_URI, BEER_PER_PAGE, INITIAL_CURRENT_PAGE } from '../utils/const';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  private _currentPage: number = INITIAL_CURRENT_PAGE;

  constructor(private http: HttpClient) {}

  public fetchPageBeer() {
    return this.http
      .get<IBeer[]>(BASE_URI, {
        params: { page: this._currentPage, per_page: BEER_PER_PAGE },
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  public fetchAllBeer() {
    return this.http
      .get<IBeer[]>(BASE_URI)
      .pipe(retry(2), catchError(this.handleError));
  }

  public fetchBeer(id: number) {
    return this.http
      .get<IBeer[]>(`${BASE_URI}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened. Please try again later.')
    );
  }

  public setCurrentPage(value: number) {
    this._currentPage = value;
  }
}
