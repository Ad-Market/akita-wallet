import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Coin } from './coin.model';

export type CoinsState = EntityState<Coin>;

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'coins',
})
export class CoinsStore extends EntityStore<CoinsState> {
  constructor() {
    super();
  }
}
