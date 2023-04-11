import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BeerService } from '../../services/beer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IBeer } from '../../types/beer';
import { NgForOf, NgIf } from '@angular/common';
import { StorageService } from '../../storage/storage.service';
import { FavoriteBeersService } from '../../services/favorite-beers.service';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.page.html',
  styleUrls: ['./beer.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, RouterLink, NgForOf],
})
export class BeerPage implements OnInit {
  id!: number;
  beer!: IBeer;
  isFavorite = false;
  ingredients!: string[];
  ingredientsLine!: string;

  constructor(
    private beerService: BeerService,
    private favoriteBeerService: FavoriteBeersService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.beerService.fetchBeer(this.id).subscribe((data) => {
      const [beer] = data;
      this.beer = beer;
      this.ingredients = [];

      beer.ingredients.malt.forEach((ingredient) => {
        this.ingredients.push(ingredient.name);
      });

      this.ingredients = this.ingredients.slice(0, 4);

      this.checkIsFavorite();
    });
  }

  addFavoriteBeer() {
    this.favoriteBeerService.addFavoriteBeer(this.beer);
    this.updateStorageFavoriteBeers();
    this.checkIsFavorite();
  }

  removeFavoriteBeer() {
    this.favoriteBeerService.removeFavoriteBeer(this.beer);
    this.updateStorageFavoriteBeers();
    this.checkIsFavorite();
  }

  checkIsFavorite() {
    this.isFavorite = this.favoriteBeerService.getIndex(this.beer) !== -1;
  }

  updateStorageFavoriteBeers() {
    this.storageService.set(
      'favoriteBeers',
      this.favoriteBeerService.getFavoriteBeers()
    );
  }
}
