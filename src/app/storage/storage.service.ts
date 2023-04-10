import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IBeer } from '../types/beer';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private favoriteBeers!: IBeer[];

  constructor(private storage: Storage) {}

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    await this._getFavoriteBeers();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async clear() {
    await this._storage?.clear();
  }

  private async _getFavoriteBeers() {
    return await this._storage?.get('favoriteBeers').then((data) => {
      this.favoriteBeers = data ? data : [];
    });
  }

  getBeers() {
    return this.favoriteBeers;
  }
}
