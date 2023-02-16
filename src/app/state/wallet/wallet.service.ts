import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { WalletStore, WalletState } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletService extends NgEntityService<WalletState> {
  constructor(protected override store: WalletStore) {
    super(store);
  }
}
