import { ID } from '@datorama/akita';

export interface Status {
  timestamp?: Date;
  error_code?: number;
  error_message?: string;
  elapsed?: number;
  notice?: string;
}

export interface Datum {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  rank: number;
}

export interface Coin {
  id: ID;
  status: Status;
  data: Datum[];
}

export function createCoin(params: Partial<Coin>) {
  return {} as Coin;
}
