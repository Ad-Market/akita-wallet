import { Component } from '@angular/core';
import { CoinsService } from './state/coins';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'akita-wallet';

  constructor(private coinsService: CoinsService) {}
}
