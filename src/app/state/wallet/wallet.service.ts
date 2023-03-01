import { CoinsQuery } from './../coins/coins.query';
import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
  distinctUntilChanged,
  takeUntil,
  takeWhile,
  throttleTime,
} from 'rxjs/operators';
import { Asset, WalletStore } from './wallet.store';
import { Subject } from 'rxjs';

export interface Data {
  /** Event Time */
  E: number;
  /** Symbol */
  s: string;
  /** Price */
  p: number;
  /** Trade time */
  T: number;
}

export interface BinanceStream {
  /** Stream name */
  stream: string;
  /** Stream data */
  data: Data;
}

@Injectable({ providedIn: 'root' })
export class WalletService implements OnDestroy {
  // private readonly unsubscribe = new BehaviorSubject<boolean>(false);
  private unsubscriber = new Subject();
  isServiceAlive = true;
  constructor(
    private walletStore: WalletStore,
    private coinsQuery: CoinsQuery
  ) {
    // this.unsubscribe.subscribe(() => console.error('MORRI'));
  }

  ngOnDestroy(): void {
    // this.unsubscribe.next(true);
    this.isServiceAlive = false;
    this.unsubscriber.next(false);
    this.unsubscriber.complete();
  }

  buyAsset(asset: Asset, quantity: number): void {
    const state = this.walletStore.getValue();

    if (state) {
      const foundAsset = state.assets.find(a => a.symbol === asset.symbol);

      if (foundAsset) {
        foundAsset.quantity =
          foundAsset?.quantity == null
            ? quantity
            : foundAsset.quantity + quantity;

        this.walletStore.update({
          consolidatedPosition: 0,
          assets: [...state.assets, foundAsset],
        });
      }
    }
  }

  watchMarket(): void {
    let streams = '';
    this.coinsQuery.getValue().data.forEach(c => {
      streams += c.symbol.toLowerCase() + 'usdt@aggTrade' + '/';
    });

    streams = streams.substring(0, streams.length - 1);

    webSocket<BinanceStream>(
      'wss://stream.binance.com:443/stream?streams=' + streams
    )
      .pipe(
        distinctUntilChanged(),
        throttleTime(1000),
        takeUntil(this.unsubscriber)
      )
      .subscribe({
        next: (coin: BinanceStream) => {
          this.walletStore.updateWallet(coin);
        },
        error: () => console.error('Websocket error'),
        complete: () => console.error('Websocket completed'),
      });
  }
}
