import { CoinsQuery } from './coins.query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cacheable } from '@datorama/akita';
import { EMPTY, switchMap, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CoinsStore } from '.';

@Injectable({ providedIn: 'root' })
export class CoinsService {
  ENDPOINT = 'http://localhost:3000/coins'; //environment.coinmarketcap.endpoint;
  API_KEY = environment.coinmarketcap.API_KEY;

  COINS_API = `${this.ENDPOINT}/v1/cryptocurrency/map?CMC_PRO_API_KEY=${this.API_KEY}&sort=cmc_rank&start=1&limit=20`;

  constructor(
    private coinsStore: CoinsStore,
    private coinsQuery: CoinsQuery,
    private http: HttpClient
  ) {}

  get(): void {
    this.http
      .get(this.ENDPOINT)
      .subscribe(coins => this.coinsStore.update(coins));
  }

  getCached(): void {
    const request$ = this.http
      .get(this.ENDPOINT)
      .pipe(tap(coins => this.coinsStore.update(coins)));

    cacheable(this.coinsStore, request$);
  }

  getSmartCached(): void {
    this.coinsQuery
      .selectHasCache()
      .pipe(
        switchMap(hasCache => {
          const apiCall = this.http.get(this.ENDPOINT).pipe(
            tap(coins => {
              this.coinsStore.update(coins);
              this.coinsStore.setHasCache(true, { restartTTL: true });
            })
          );

          return hasCache ? EMPTY : apiCall;
        })
      )
      .subscribe();
  }
}
