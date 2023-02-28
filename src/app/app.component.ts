import { User } from './state/users/user.model';
import { UsersQuery } from './state/users/users.query';
import { CoinsQuery } from './state/coins/coins.query';
import { Component, OnInit } from '@angular/core';
import { CoinsService } from './state/coins';
import { Observable, tap } from 'rxjs';
import { Coin } from './state/coins/coins.store';
import { UsersService } from './state/users';
import { HashMap } from '@datorama/akita';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allCoins$: Observable<Coin[]>;
  users$: Observable<User[]>;
  users2$: Observable<HashMap<User> | undefined>;

  constructor(
    private coinsService: CoinsService,
    private coinsQuery: CoinsQuery,
    private usersQuery: UsersQuery,
    private userService: UsersService
  ) {
    this.allCoins$ = this.coinsQuery.allCoins$;
    this.users$ = this.usersQuery.users$;
    this.users2$ = this.usersQuery.users2$.pipe(tap(x => console.log(x)));
  }

  ngOnInit(): void {
    this.coinsService.getSmartCached();
    this.userService.getCached();
  }
}
