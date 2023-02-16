import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CoinsStore } from '.';

@Injectable({ providedIn: 'root' })
export class CoinsService {
  ENDPOINT = environment.coinmarketcap.endpoint;
  API_KEY = environment.coinmarketcap.API_KEY;

  COINS_API = `${this.ENDPOINT}/v1/cryptocurrency/map?CMC_PRO_API_KEY=${this.API_KEY}&sort=cmc_rank&start=1&limit=20`;

  constructor(private coinsStore: CoinsStore, private http: HttpClient) {}

  get(): void {
    this.http
      .get(this.ENDPOINT)
      .subscribe(coins => this.coinsStore.update(coins));
  }
}
