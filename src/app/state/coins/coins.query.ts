import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CoinsState, CoinsStore } from './coins.store';

@Injectable({ providedIn: 'root' })
export class CoinsQuery extends QueryEntity<CoinsState> {
  constructor(protected override store: CoinsStore) {
    super(store);
  }
}
