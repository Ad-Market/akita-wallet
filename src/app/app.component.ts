import { CoinsQuery } from './state/coins/coins.query';
import { Component, OnInit } from '@angular/core';
import { CoinsService } from './state/coins';
import { Observable } from 'rxjs';
import { Coin } from './state/coins/coins.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allCoins$: Observable<Coin[]>;

  constructor(
    private coinsService: CoinsService,
    private coinsQuery: CoinsQuery
  ) {
    this.allCoins$ = this.coinsQuery.allCoins$;
  }

  ngOnInit(): void {
    this.coinsService.get();
  }
}
