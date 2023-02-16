import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WalletStore, WalletState } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletQuery extends QueryEntity<WalletState> {
  constructor(protected override store: WalletStore) {
    super(store);
  }
}
