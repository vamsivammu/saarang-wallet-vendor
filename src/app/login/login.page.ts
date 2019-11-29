import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import consts from '../consts'
import {LoadingController} from '@ionic/angular'
import {Router} from '@angular/router'
import {Socket} from 'ngx-socket-io'
import {Firebase} from '@ionic-native/firebase/ngx'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  email;
  password;
  loading = false;
  token;
  constructor(private http:HttpClient,private loadingController:LoadingController,private router:Router,private socket:Socket,private firebase:Firebase) { }

  ngOnInit() {
    this.init()
  }

  async init(){
    this.token = await this.firebase.getToken()
    const perm = await this.firebase.grantPermission()
  }
  async login(){
    var body = {
      "provider": "username",
      "data": {
          "username": this.email,
          "password": this.password
      }
  }
  var headers = {
    headers:{
      'Content-Type':'application/json'
    }
  }
  const loading = await this.loadingController.create({
    message: 'Signing in..'
  });
  loading.present()
  
    this.http.post(consts.auth_url,body,headers).subscribe((r)=>{
      console.log(r)
      this.socket.connect()
      this.socket.emit('join',r)
      this.http.post('https://api.saarang.org/wallet/update_device_token',{hasura_id:r['hasura_id'],token:this.token}).toPromise().then(r1=>{
      
        this.router.navigate(['/home'])
        loading.dismiss()          
      })
    },err=>{
      loading.dismiss()
      alert(err.error.message)
    })
  
  }
}
