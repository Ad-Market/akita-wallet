import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, ButtonComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production
      ? []
      : AkitaNgDevtools.forRoot({
          maxAge: 25,
        }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
