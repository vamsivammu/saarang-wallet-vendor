import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import consts from '../consts'
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  constructor(private http:HttpClient) { }
  members:any
  last_id:any
  hasura_id:any
  ngOnInit() {
    var headers = {
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer 0a5b33a7feea014cb07047b70774d86e4ab28513fda2ec8a'
      }
    }
    var query = {
      "type": "select",
      "args": {
          "table": "coupon_transactions",
          "columns": [
              "*"
          ],
          "where": {
              "$or": [
                  {
                      "from": {
                          "$eq": this.hasura_id
                      }
                  },
                  {
                      "to": {
                          "$eq": this.hasura_id
                      }
                  }
              ]
          },
          "order_by": [
              {
                  "column": "date",
                  "order": "desc"
              }
          ],
          "limit": 50
      }
  }
  this.http.post(consts.data_url,query,headers).subscribe(r=>{
    this.members = r
    this.last_id = this.members[49].date
  })
  }

  loadData(e){
    var headers = {
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer 0a5b33a7feea014cb07047b70774d86e4ab28513fda2ec8a'
      }
    }
    var query = {
      "type": "select",
      "args": {
          "table": "coupon_transactions",
          "columns": [
              "*"
          ],
          "where": {
              "$and": [
                  {
                      "$or": [
                          {
                              "from": {
                                  "$eq": ""
                              }
                          },
                          {
                              "to": {
                                  "$eq": ""
                              }
                          }
                      ]
                  },
                  {
                      "date": {
                          "$lt": ""
                      }
                  }
              ]
          },
          "order_by": [
            {
                "column": "date",
                "order": "desc"
            }
        ],
        "limit":50
      }
  }

  this.http.post(consts.data_url,query,headers).subscribe(r=>{
      var data :any;
      data = r
      for(var i=0;i<data.length;i++){
        this.members.push(data[i])
      }
      this.last_id = this.members[this.members.length-1].date
      e.target.complete()
  })
  }
}
