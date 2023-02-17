import { UsersQuery } from './state/users/users.query';
import { CoinsQuery } from './state/coins/coins.query';
import { Component, OnInit } from '@angular/core';
import { CoinsService } from './state/coins';
import { Observable } from 'rxjs';
import { Coin } from './state/coins/coins.store';
import { UsersService } from './state/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allCoins$: Observable<Coin[]>;
  users$: Observable<any>;

  constructor(
    private coinsService: CoinsService,
    private coinsQuery: CoinsQuery,
    private usersQuery: UsersQuery,
    private userService: UsersService
  ) {
    this.allCoins$ = this.coinsQuery.allCoins$;
    this.users$ = this.usersQuery.users$;
  }

  ngOnInit(): void {
    this.coinsService.getSmartCached();
    // this.userService.getCached();
  }
}
