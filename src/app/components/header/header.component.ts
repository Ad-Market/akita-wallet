import { WalletQuery } from './../../state/wallet/wallet.query';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  consolidatedPosition$: Observable<number>;

  constructor(private walletQuery: WalletQuery) {
    this.consolidatedPosition$ =
      this.walletQuery.walletConsolidatedPosition$.pipe(
        tap((value: number) => value.toFixed(2))
      );
  }
}
