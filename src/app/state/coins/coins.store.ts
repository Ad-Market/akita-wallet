import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface Status {
  timestamp?: Date;
  error_code?: number;
  error_message?: string;
  elapsed?: number;
  notice?: string;
}

export interface Coin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  rank: number;
}

export interface CoinsState {
  status: Status;
  data: Coin[];
}

export function createInitialState(): CoinsState {
  return {
    status: {},
    data: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'coins',
  cache: {
    ttl: 5000,
  },
})
export class CoinsStore extends Store<CoinsState> {
  constructor() {
    super(createInitialState());
  }
}
