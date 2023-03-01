import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { WalletStore, WalletState } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletQuery extends Query<WalletState> {
  readonly wallet$: Observable<WalletState>;
  readonly walletConsolidatedPosition$: Observable<number>;

  constructor(protected override store: WalletStore) {
    super(store);
    this.wallet$ = this.select(state => state);
    this.walletConsolidatedPosition$ = this.select(state =>
      this.sumTotal(state)
    );
  }

  private sumTotal(state: WalletState): number {
    let sum = 0;

    state.assets.forEach(x => {
      sum += (x.quantity ?? 0) * x.price;
    });

    return sum;
  }
}
