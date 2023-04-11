import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { NgIf } from '@angular/common';

import { StorageService } from './storage/storage.service';
import { FavoriteBeerListService } from './services/favorite-beer-list.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf],
})
export class AppComponent implements OnInit {
  isLoaded = false;
  isError = false;
  errorMessage!: string;

  constructor(
    private storageService: StorageService,
    private favoriteBeerListService: FavoriteBeerListService,
    private toastController: ToastController
  ) {}
  ngOnInit() {
    this._createLocaleStorage().then(() => this._setFavoriteBeerList());
  }

  private async _createLocaleStorage() {
    try {
      await this.storageService.initStorage();
      await this.storageService.getFavoriteBeerList();
    } catch (err) {
      this.isError = true;
      this.errorMessage = `Some error occurred! Try later. Message will disappear automatically.`;

      this._presentToast();
    }
  }

  private _setFavoriteBeerList() {
    const beerList = this.storageService.getBeerList();
    this.favoriteBeerListService.setInitialFavoriteBeerList(beerList);

    this.isLoaded = true;
  }

  private async _presentToast() {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      duration: 5000,
      position: 'middle',
    });
    await toast.present();
  }
}
