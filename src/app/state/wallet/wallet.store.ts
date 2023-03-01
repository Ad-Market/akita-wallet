import { BinanceStream } from './wallet.service';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface Asset {
  symbol: string;
  name?: string;
  price: number;
  quantity?: number;
}

export interface WalletState {
  consolidatedPosition: number;
  assets: Asset[];
}

export function createInitialState(): WalletState {
  return {
    consolidatedPosition: 0,
    assets: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wallet' })
export class WalletStore extends Store<WalletState> {
  constructor() {
    super(createInitialState());
  }

  updateWallet(stream: BinanceStream): void {
    const currentState = this.getValue();
    let assets = [];

    if (currentState.assets.find(item => item.symbol === stream.data.s)) {
      assets = structuredClone(currentState.assets);
      assets.map(item => {
        if (item.symbol === stream.data.s) {
          item.price = stream.data.p;
        }
      });
    } else {
      assets = [
        ...currentState.assets,
        { price: stream.data.p, symbol: stream.data.s },
      ];
    }

    this.update({
      consolidatedPosition: currentState.consolidatedPosition,
      assets: assets,
    });
  }
}
