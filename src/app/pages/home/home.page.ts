import { Component, OnInit } from '@angular/core';
import {
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';

import { CardComponent } from '../../components/card/card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FavoritesModalComponent } from '../../components/favorites-modal/favorites-modal.component';

import { IBeer } from '../../types/beer';

import { BeerService } from '../../services/beer.service';
import {
  BEER_PER_PAGE,
  DisplayMode,
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

  isLoadedPages = false;
  isLoadedBeer = false;

  mode;

  constructor(
    private beerService: BeerService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.mode = document.body.classList.contains(DisplayMode.Dark)
      ? DisplayMode.Dark
      : DisplayMode.Light;
  }

  ngOnInit() {
    this._getAllBeer();
    this._getPageBeer();
  }

  private async _getAllBeer() {
    const loading = await this._getLoader();

    this.beerService.fetchAllBeer().subscribe({
      next: (data) => {
        const totalPages = data.length / BEER_PER_PAGE;

        for (let i = 1; i <= totalPages; i++) {
          this.pages.push(i);
        }
        this.setPagesToView();

        loading.dismiss();
        this.isLoadedBeer = true;
      },
      error: (err) => {
        loading.dismiss();
        this._presentToast(err.message);
      },
    });
  }

  private async _getPageBeer() {
    const loading = await this._getLoader();

    this.beerService.fetchPageBeer().subscribe({
      next: (data) => {
        this.beerList = data;
        loading.dismiss();
        this.isLoadedPages = true;
      },
      error: (err) => {
        loading.dismiss();
        this._presentToast(err.message);
      },
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

  toggle() {
    document.body.classList.toggle(DisplayMode.Dark);
    this.mode =
      this.mode === DisplayMode.Dark ? DisplayMode.Light : DisplayMode.Dark;
  }

  private async _getLoader() {
    const loader = await this.loadingController.create({
      message: 'Please wait...',
    });

    loader.present();
    return loader;
  }

  private async _presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message || 'Something is wrong. Try later.',
      duration: 5000,
      position: 'middle',
    });
    await toast.present();
  }
}
