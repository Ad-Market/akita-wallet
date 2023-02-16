import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Coin, CoinsState, CoinsStore } from './coins.store';

@Injectable({ providedIn: 'root' })
export class CoinsQuery extends Query<CoinsState> {
  readonly allCoins$: Observable<Coin[]>;

  constructor(protected override store: CoinsStore) {
    super(store);

    this.allCoins$ = this.select(state => state.data);
  }
}
