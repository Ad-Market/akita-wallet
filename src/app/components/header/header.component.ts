import { WalletQuery } from './../../state/wallet/wallet.query';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletState } from 'src/app/state/wallet';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  wallet$: Observable<WalletState>;

  constructor(private walletQuery: WalletQuery) {
    this.wallet$ = this.walletQuery.wallet$;
  }
}
