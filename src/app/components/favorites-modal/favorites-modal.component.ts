import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IBeer } from '../../types/beer';
import { NgForOf, NgIf } from '@angular/common';
import { FavoriteBeersService } from '../../services/favorite-beers.service';
import { RouterLink } from '@angular/router';

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

  message =
    'List of favorite beer is empty. You can add beer to this list on beer page.';

  constructor(private favoriteBeerService: FavoriteBeersService) {}

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  ngOnInit() {
    this.setFavorite();
  }

  onOpenButtonClickHandler() {
    this.setFavorite();
  }

  setFavorite() {
    this.favoriteBeers = this.favoriteBeerService.getFavoriteBeers();
  }

  removeFromFavorite(beer: IBeer) {
    this.favoriteBeerService.removeFavoriteBeer(beer);
  }
}
