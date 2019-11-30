import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router'
import {AlertController} from '@ionic/angular'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private alertController:AlertController
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.platform.backButton.subscribe(()=>{
      console.log(this.router.url)
      if(this.router.url=='/home' || this.router.url=='/login'){
          this.presentAlertConfirm()
      }
    })
    setInterval(()=>{
      console.log(this.router.url)
    },2000)
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you want to close the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
              
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp()
          }
        }
      ]
    });

    await alert.present();
  }


}
