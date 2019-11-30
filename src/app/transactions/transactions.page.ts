import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import consts from '../consts'
import {Router} from '@angular/router'
import {LoadingController} from '@ionic/angular'
import {NativeStorage} from '@ionic-native/native-storage/ngx'
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.css'],
})
export class TransactionsPage implements OnInit {

  constructor(private http:HttpClient,private loadingController:LoadingController,private router:Router,private ns:NativeStorage) { }
  transactions:any
  last_date:any
  hasura_id:any
  auth_token:any
balance:any
  async ngOnInit() {

    var loading =await this.presentLoading()
    console.log(this.router.url)
    this.ns.getItem('userdata').then(data=>{
      if(data!=null){
        this.auth_token = data.auth_token
        this.hasura_id = data.hasura_id
        this.http.post('https://api.saarang.org/wallet/get-transactions',{is_vendor:true,auth_token:this.auth_token,last_transaction_date:null}).subscribe(r=>{
          console.log(r)   
          if(r['code']==200){
            this.transactions = r['transactions']
            this.last_date = r['last_transaction_date']
            this.balance = r['balance']
            loading.dismiss()
          }else{
            
          }
    },err=>{
      console.log(err)
      this.router.navigate(['login'])
    })
      }else{
        this.router.navigate(['login'])
      }


    })

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
  async loadData(e){

    await this.http.post('https://api.saarang.org/wallet/get-transactions',{is_vendor:true,auth_token:this.auth_token,last_transaction_date:this.last_date}).subscribe(r=>{
      // console.log(r)   
      if(r['code']==200){
        var transactions = r['transactions']
        for(var i=0;i<transactions.length;i++){
          this.transactions.push(transactions[i])
        }
        this.last_date = r['last_transaction_date']
        this.balance = r['balance']
        e.target.complete()
      }else{
        
      }
},err=>{
  console.log(err)
})

  }

gotohome(){
  this.router.navigate(['home'])
}
  async presentLoading() {
    const loading =await this.loadingController.create({
      message: 'Loading..'
    });
   loading.present();

    return loading

  }
}
