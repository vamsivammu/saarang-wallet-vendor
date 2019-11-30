import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {LoadingController} from '@ionic/angular'
import {Router} from '@angular/router'
import {NativeStorage} from '@ionic-native/native-storage/ngx'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {
hasura_id:any
auth_token:any
transactions:any
balance
  constructor(private http:HttpClient,private loadingController:LoadingController,private router:Router,private ns:NativeStorage) {
    this.ns.getItem('userdata').then(data=>{
      this.hasura_id = data.hasura_id
      this.auth_token = data.auth_token
      this.get_transactions()

    })
    
  }

 async get_transactions(){
  var loading = await this.presentLoading()
    this.http.post('https://api.saarang.org/wallet/get-transactions',{is_vendor:true,auth_token:this.auth_token}).subscribe(r=>{
      if(r['code']==200){
        this.transactions = r['transactions']
        this.balance = r['balance']
        loading.dismiss()
      }else{
        
      }
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading..'
    });
   loading.present();

    return loading

  }
  gototransactions(){
    this.router.navigate(['transactions'])
  }
  getsign(from){
    // console.log(from)
    if(from==this.hasura_id){
      // console.log("from")
      return "-"
    }else{
      // console.log("to")
      return "+"
    }
  }
  getclass(from){
    if(from==this.hasura_id){
      return 'subtract-money'
    }else{
      return 'add-money'
    }
  }
  getdate(date){
    var d = new Date(date)
    var d_new = new Date(d.getTime()-d.getTimezoneOffset()*60000).toLocaleString()
    return d_new
  }


}

