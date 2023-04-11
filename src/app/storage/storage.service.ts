import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { IBeer } from '../types/beer';
import { STORAGE_KEY_FAVORITE_BEER_LIST } from '../utils/const';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private _favoriteBeerList!: IBeer[];

  constructor(private storage: Storage) {}

  public async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: IBeer[]) {
    await this._storage?.set(key, value);
  }

  public async clear() {
    await this._storage?.clear();
  }

  public async getFavoriteBeerList() {
    const data = await this._storage?.get(STORAGE_KEY_FAVORITE_BEER_LIST);
    this._favoriteBeerList = data ? data : [];
  }

  public getBeerList() {
    return this._favoriteBeerList;
  }
}
