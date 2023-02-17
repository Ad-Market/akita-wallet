import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User, UsersQuery } from '.';
import { UsersStore } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private usersStore: UsersStore,
    private usersQuery: UsersQuery,
    private http: HttpClient
  ) {}

  get() {
    this.http
      .get('http://localhost:3000/data')
      .pipe(tap((entities: any) => this.usersStore.set(entities)))
      .subscribe();
  }

  getCached() {
    this.usersQuery
      .selectHasCache()
      .pipe(
        switchMap(hasCache => {
          const apiCall = this.http
            .get('http://localhost:3000/data')
            .pipe(tap((products: any) => this.usersStore.set(products)));

          return hasCache ? EMPTY : apiCall;
        })
      )
      .subscribe();
  }
}
