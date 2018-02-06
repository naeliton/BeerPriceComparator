import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { CervejaProvider } from '../providers/cerveja/cerveja';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Grande sacada para formatar numeros e datas no formato brasileiro
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    CervejaProvider,
  ]
})
export class AppModule {}
