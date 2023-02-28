import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HashMap, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { UsersStore, UsersState } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState> {
  users$: Observable<User[]>;
  users2$: Observable<HashMap<User> | undefined>;

  constructor(protected override store: UsersStore) {
    super(store);

    this.users$ = this.selectAll();
    this.users2$ = this.select(x => x.entities);
  }
}
