import { Component, OnInit } from '@angular/core';
import {
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

import { IBeer } from '../../types/beer';

import { Route, STORAGE_KEY_FAVORITE_BEER_LIST } from '../../utils/const';

import { BeerService } from '../../services/beer.service';
import { FavoriteBeerListService } from '../../services/favorite-beer-list.service';
import { StorageService } from '../../storage/storage.service';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.page.html',
  styleUrls: ['./beer.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, NgForOf, RouterLink],
})
export class BeerPage implements OnInit {
  id!: number;
  beer!: IBeer;
  isFavorite = false;
  ingredients!: string[];
  Route = Route;

  constructor(
    private beerService: BeerService,
    private favoriteBeerService: FavoriteBeerListService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this._setId();
    this._fetchBeer();
  }

  private _setId() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  private async _fetchBeer() {
    const loading = await this._getLoader();

    this.beerService.fetchBeer(this.id).subscribe({
      next: (data) => {
        const [beer] = data;
        this.beer = beer;
        this.ingredients = [];

        beer.ingredients.malt.forEach((ingredient) => {
          this.ingredients.push(ingredient.name);
        });

        this.ingredients = this.ingredients.slice(0, 4);

        this.checkIsFavorite();
        loading.dismiss();
      },
      error: (err) => {
        loading.dismiss();
        this._presentToast(err.message);
      },
    });
  }

  public addFavoriteBeer() {
    this.favoriteBeerService.addFavoriteBeer(this.beer);
    this._updateStorageFavoriteBeerList();
    this.checkIsFavorite();
  }

  public removeFavoriteBeer() {
    this.favoriteBeerService.removeFavoriteBeer(this.beer);
    this._updateStorageFavoriteBeerList();
    this.checkIsFavorite();
  }

  private async _updateStorageFavoriteBeerList() {
    await this.storageService.set(
      STORAGE_KEY_FAVORITE_BEER_LIST,
      this.favoriteBeerService.getFavoriteBeerList()
    );
  }

  public checkIsFavorite() {
    this.isFavorite = this.favoriteBeerService.getBeerIndex(this.beer) !== -1;
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
