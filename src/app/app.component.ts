import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from './storage/storage.service';
import { FavoriteBeersService } from './services/favorite-beers.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf],
})
export class AppComponent implements OnInit {
  isLoaded = false;

  constructor(
    private storageService: StorageService,
    private favoriteBeersService: FavoriteBeersService
  ) {
    this.getLocaleStorage();
  }

  getLocaleStorage() {
    this.storageService.init().then(() => {
      const beers = this.storageService.getBeers();
      this.favoriteBeersService.setFavoriteBeersInitial(beers);
      this.isLoaded = true;
    });
  }

  ngOnInit(): void {}
}
