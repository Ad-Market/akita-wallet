import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';

import { CoinsState, CoinsStore } from './coins.store';

@Injectable({ providedIn: 'root' })
export class CoinsService extends NgEntityService<CoinsState> {
  constructor(protected override store: CoinsStore) {
    super(store);
  }
}
