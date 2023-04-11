import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

import {
  BEER_LIST_EMPTY_MESSAGE,
  STORAGE_KEY_FAVORITE_BEER_LIST,
} from '../../utils/const';
import { IBeer } from '../../types/beer';

import { FavoriteBeerListService } from '../../services/favorite-beer-list.service';
import { StorageService } from '../../storage/storage.service';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, NgForOf, NgIf, RouterLink],
})
export class FavoritesModalComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  favoriteBeers: IBeer[] = [];

  message = BEER_LIST_EMPTY_MESSAGE;

  constructor(
    private favoriteBeerService: FavoriteBeerListService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this._setFavorite();
  }

  private _setFavorite() {
    this.favoriteBeers = this.favoriteBeerService.getFavoriteBeerList();
  }

  clearFavoriteBeerList() {
    this.favoriteBeerService.clearFavoriteBeerList();
    this._clearStorageFavoriteBeerList();
    this.favoriteBeers = [];
  }

  removeFromFavorite(beer: IBeer) {
    this.favoriteBeerService.removeFavoriteBeer(beer);
    this._updateStorageFavoriteBeerList();
  }

  private async _updateStorageFavoriteBeerList() {
    await this.storageService.set(
      STORAGE_KEY_FAVORITE_BEER_LIST,
      this.favoriteBeerService.getFavoriteBeerList()
    );
  }

  private async _clearStorageFavoriteBeerList() {
    await this.storageService.clear();
  }

  onOpenButtonClickHandler() {
    this._setFavorite();
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }
}
