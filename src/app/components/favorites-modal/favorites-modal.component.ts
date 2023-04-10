import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BeerService } from '../../services/beer.service';
import { IBeer } from '../../types/beer';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, NgForOf, NgIf],
})
export class FavoritesModalComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  favoriteBeers: IBeer[] = [];

  message =
    'List of favorite beer is empty. You can add beer to this list on beer page.';

  constructor(private beerService: BeerService) {}

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  ngOnInit() {
    this.favoriteBeers = this.beerService.getFavoriteBeers();
  }

  removeFromFavorite(beer: IBeer) {
    this.beerService.removeFavoriteBeer(beer);
  }
}
