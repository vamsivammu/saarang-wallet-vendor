import { Component } from '@angular/core';
import {Socket} from 'ngx-socket-io'
import {LocalNotifications} from '@ionic-native/local-notifications/ngx'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private socket:Socket,private localNotification:LocalNotifications) {
    
    this.socket.fromEvent('call_back').subscribe(data=>{
      console.log(data)
      alert(data['msg'])
    })
    this.socket.fromEvent('new_payment').subscribe(data=>{
      console.log(data)
      this.localNotification.schedule({
        id: 1,
        text: 'Single ILocalNotification',
        data:data
      });
    })
    
    
  }

  emit(){
    this.socket.emit('new_event',{msg:'new event'})
    
  }

}
