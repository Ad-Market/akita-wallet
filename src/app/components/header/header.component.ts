import { WalletQuery } from './../../state/wallet/wallet.query';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsersQuery } from 'src/app/state/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  consolidatedPosition$: Observable<number>;
  userError$: Observable<string>;

  constructor(private walletQuery: WalletQuery, private userQuery: UsersQuery) {
    this.userError$ = this.userQuery.selectError();
    this.consolidatedPosition$ =
      this.walletQuery.walletConsolidatedPosition$.pipe(
        tap((value: number) => value.toFixed(2))
      );
  }
}
