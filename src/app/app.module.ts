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

import {SocketIoModule,SocketIoConfig} from 'ngx-socket-io'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx'
// import {BackgroundMode} from '@ionic-native/background-mode/ngx'
import {FirebaseX} from '@ionic-native/firebase-x/ngx'
const cfg:SocketIoConfig={url:'https://api.saarang.org',options:{}}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,SocketIoModule.forRoot(cfg)],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    FirebaseX,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
