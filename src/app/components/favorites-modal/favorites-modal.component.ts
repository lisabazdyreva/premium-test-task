import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

import { BEER_LIST_EMPTY_MESSAGE } from '../../utils/const';
import { IBeer } from '../../types/beer';

import { FavoriteBeerListService } from '../../services/favorite-beer-list.service';

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

  constructor(private favoriteBeerService: FavoriteBeerListService) {}

  ngOnInit() {
    this._setFavorite();
  }

  private _setFavorite() {
    this.favoriteBeers = this.favoriteBeerService.getFavoriteBeerList();
  }

  removeFromFavorite(beer: IBeer) {
    this.favoriteBeerService.removeFavoriteBeer(beer);
  }

  onOpenButtonClickHandler() {
    this._setFavorite();
  }

  public close() {
    this.modal.dismiss(null, 'cancel');
  }
}
