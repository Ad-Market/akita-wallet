import { Component, OnInit } from '@angular/core';
import { CoinsService } from './state/coins';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'akita-wallet';

  constructor(private coinsService: CoinsService) {}

  ngOnInit(): void {
    this.coinsService.get().subscribe(res => {
      console.log(res);
    });
  }
}
