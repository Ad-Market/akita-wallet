import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HashMap, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { UsersStore, UsersState } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState> {
  users$: Observable<any>;
  constructor(protected override store: UsersStore) {
    super(store);

    this.users$ = this.select(state => state.entities);
  }
}
