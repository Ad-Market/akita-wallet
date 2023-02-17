import { ID } from '@datorama/akita';

export interface User {
  id: ID;
  name: string;
  username: string;
  phone: string;
}

export function createUser(params: Partial<User>) {
  return {} as User;
}
