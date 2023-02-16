import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Wallet } from './wallet.model';

export type WalletState = EntityState<Wallet>;

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'wallet',
})
export class WalletStore extends EntityStore<WalletState> {
  constructor() {
    super();
  }
}
