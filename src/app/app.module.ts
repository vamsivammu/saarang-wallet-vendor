import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Push} from '@ionic-native/push/ngx'
import {SocketIoModule,SocketIoConfig} from 'ngx-socket-io'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import {BackgroundMode} from '@ionic-native/background-mode/ngx'
import {Firebase} from '@ionic-native/firebase/ngx'
const cfg:SocketIoConfig={url:'https://api.saarang.org',options:{}}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,SocketIoModule.forRoot(cfg)],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    LocalNotifications,
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
