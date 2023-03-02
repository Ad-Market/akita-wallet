import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UsersQuery } from '.';
import { UsersStore } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private usersStore: UsersStore,
    private usersQuery: UsersQuery,
    private http: HttpClient
  ) {}

  get(): void {
    this.http
      .get('http://localhost:3000/users')
      .pipe(tap((entities: any) => this.usersStore.set(entities)))
      .subscribe();
  }

  getCached(): void {
    this.usersQuery
      .selectHasCache()
      .pipe(
        switchMap(hasCache => {
          const apiCall = this.http.get('http://localhost:3000/users').pipe(
            tap((users: any) => {
              this.usersStore.set(users);
              this.usersStore.setError(null);
            })
          );

          return hasCache ? EMPTY : apiCall;
        })
      )
      .subscribe({
        error: () =>
          this.usersStore.setError('Não consegui atualizar os usuarios'),
      });
  }
}
