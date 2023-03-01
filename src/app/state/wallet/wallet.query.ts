import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { WalletStore, WalletState } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletQuery extends Query<WalletState> {
  readonly wallet$: Observable<WalletState>;

  constructor(protected override store: WalletStore) {
    super(store);
    this.wallet$ = this.select(state => state);
  }
}
