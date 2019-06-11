import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { Shop } from '../model/shop';

@Injectable()
export class ShopDataStore {

  public static readonly PATH = '/shops';

  constructor(
    private api: ApiService
  ) {}

  update(id: string, params: {[key: string]: any}) {
    this.api.afs.doc(ShopDataStore.PATH+`/${id}`).update(params);
  }
}