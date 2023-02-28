import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UsersState extends EntityState<User, number> {
  date: Date;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'users',
  cache: {
    ttl: 5000,
  },
})
export class UsersStore extends EntityStore<UsersState> {
  constructor() {
    super();
  }
}
