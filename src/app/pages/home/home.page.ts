import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';

import { CardComponent } from '../../components/card/card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FavoritesModalComponent } from '../../components/favorites-modal/favorites-modal.component';

import { IBeer } from '../../types/beer';

import { BeerService } from '../../services/beer.service';
import {
  BEER_PER_PAGE,
  INITIAL_CURRENT_PAGE,
  PageValue,
} from '../../utils/const';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    CardComponent,
    PaginationComponent,
    NgIf,
    FavoritesModalComponent,
  ],
})
export class HomePage implements OnInit {
  beerList: IBeer[] = [];
  currentPage = INITIAL_CURRENT_PAGE;

  pages: number[] = [];
  pagesToView: number[] = [];

  mode;

  constructor(
    private beerService: BeerService,
    private loadingController: LoadingController
  ) {
    this.mode = document.body.classList.contains('dark') ? 'dark' : 'light';
  }

  ngOnInit() {
    this._getAllBeer();
    this._getPageBeer();
  }

  private async _getAllBeer() {
    const loading = await this._getLoader();

    this.beerService.fetchAllBeer().subscribe((data) => {
      const totalPages = data.length / BEER_PER_PAGE;

      for (let i = 1; i <= totalPages; i++) {
        this.pages.push(i);
      }
      this.setPagesToView();

      loading.dismiss();
    });
  }

  private async _getPageBeer() {
    const loading = await this._getLoader();

    this.beerService.fetchPageBeer().subscribe((data) => {
      this.beerList = data;
      loading.dismiss();
    });
  }

  public setPageNumValue(value: number | string) {
    switch (typeof value) {
      case 'number': {
        this.currentPage = value;
        break;
      }
      case 'string': {
        if (value === PageValue.Previous) {
          this.currentPage -= 1;
          break;
        }

        if (value === PageValue.Next) {
          this.currentPage += 1;
          break;
        }
      }
    }

    this.beerService.setCurrentPage(this.currentPage);
    this._getPageBeer();
    this.setPagesToView();
  }

  public setPagesToView() {
    switch (this.currentPage) {
      case 1: {
        this.pagesToView = this.pages.slice(
          this.currentPage - 1,
          this.currentPage + 2
        );
        break;
      }
      case this.pages[this.pages.length - 1]: {
        this.pagesToView = this.pages.slice(
          this.currentPage - 3,
          this.currentPage
        );
        break;
      }
      default: {
        this.pagesToView = this.pages.slice(
          this.currentPage - 2,
          this.currentPage + 1
        );
        break;
      }
    }
  }

  private async _getLoader() {
    const loader = await this.loadingController.create({
      message: 'Please wait...',
    });

    loader.present();
    return loader;
  }

  toggle() {
    document.body.classList.toggle('dark');
    this.mode = this.mode === 'dark' ? 'light' : 'dark';
  }
}
