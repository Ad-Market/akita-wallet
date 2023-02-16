import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Coin, CoinsStore } from '.';

@Injectable({ providedIn: 'root' })
export class CoinsService {
  URL = environment.coinmarketcap.endpoint;
  API_KEY = environment.coinmarketcap.API_KEY;

  constructor(private coinsStore: CoinsStore, private http: HttpClient) {}

  get(): Observable<Coin> {
    return this.http
      .get<Coin>(
        `${this.URL}/v1/cryptocurrency/map?CMC_PRO_API_KEY=${this.API_KEY}&sort=cmc_rank&start=1&limit=20`
      )
      .pipe(tap((coins: Coin) => this.coinsStore.set({ coins })));
  }
}
