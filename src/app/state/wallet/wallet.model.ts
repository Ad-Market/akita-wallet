import { ID } from '@datorama/akita';

export interface Asset {
  symbol: number;
  name: string;
  icon: string;
  price: number;
}

export interface UserAsset {
  asset: Asset;
  boughtPrice: number;
  quantity: number;
}

export interface Wallet {
  id: ID;
  consolidatedPosition: number;
  assets: Asset[];
}

export function createWallet(params: Partial<Wallet>) {
  return {} as Wallet;
}
