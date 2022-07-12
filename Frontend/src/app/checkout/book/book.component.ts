import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { OrderService } from 'src/app/shared/services/order.service';
import {  trigger,  state,  style,  animate, 
  transition,} from '@angular/animations';
import { SelectControlValueAccessor } from '@angular/forms';
//import { join } from 'path';
//import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [
    trigger('time', [
      state('off', style({
        color:'#2be65a',
        backgroundColor:'white',
        borderColor:'#2be65a'
      })),
      state('on', style({
        backgroundColor:'#2be65a',
        color:'white',
        borderColor:'#2be65a'
		  
      })),
		
    ]),
    trigger('datepay', [
      state('off', style({
        color:'red',
        backgroundColor:'white',
        cursor:'pointer'
      })),
      state('on', style({
        backgroundColor:'red',
        color:'white',
        cursor:'pointer'
		  
      })),
		
    ])
  ]
})
export class BookComponent implements OnInit {

  constructor(private order:OrderService,private api:AppService) { }

  ngOnInit(): void {
    this.setDate()
    this.load()
    
  }
  price:string=''
  name:string=''
  day:number=0
  currmonth:string=''
  monthno:number=0
  currweek:string=''
  year:string=''
  nxtmonth:string=''
  date:Array<any>=[]
  sdate:any
  stime:string=''
  spay:string=''
  adate:number=0
  atime:number=0
  apay:number=0
  orderid:number=0
  selectpay(a:number){
    this.apay=a
    
  }
  selectdate(a:number){
    this.adate=a
  }
  selecttime(a:number){
    this.atime=a

  }


  book(){
  
    let name=localStorage.getItem('name')||''
    let email=localStorage.getItem('email')||''
    let date=this.date[this.adate].month+" "+this.date[this.adate].day+" "+this.date[this.adate].week
    let time='';
    if(this.atime==0)
      time="9:00 AM - 12:00 PM"
    else if(this.atime ==1)
      time="12:00 PM - 3:00 PM"
    else if(this.atime ==2)
      time="3:00 PM - 6:00 PM"  
    else if(this.atime ==3)
      time="6:00 PM - 9:00 PM"
    
    this.api.createOrder(name,email,date,time).subscribe
    ((r:any) => {
        if(r.status){
          this.orderid=r.orderid
          if(this.apay==0)
            this.pay()
          else{
            let city = localStorage.getItem('city') || ''
            let lng = localStorage.getItem('lng') || ''
            let lat = localStorage.getItem('lat') || ''
            let subcat = localStorage.getItem('sub') || ''
            let type = localStorage.getItem('type') || ''
            let price=parseInt(this.price)
            this.api.setOrder(this.orderid,false,"N A","Cash on service",price,city,lng,lat,subcat,type).subscribe
            ((r:any) => {
              if(r){
                console.log("success",r)
                window.location.replace("/home") 
              }
              else 
              console.log(r.status)
            })
          
        }
      }
    })
    //this.pay()
    
    
  }

  success(){
    //orderid:number,payementstatus:boolean,paymentid:string,paymenttype:string,price:number
    /*this.api.setOrder(this.orderid,true,paymentid).subscribe
			((r:any) => {
          if(r.status){
            console.log("order created")
          }
      })
      */
    alert('the transactions was successful')
    //window.location.replace("/home")

  }

  pay(){
    var options = {
      "key": "rzp_test_lVGPOgZieAvnyb",
      "amount": "70000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "handler": (response:any)=>{
        //this.paymentid=response.razor
        alert(response.razorpay_payment_id);
        let price=parseInt(this.price)
        let city = localStorage.getItem('city') || ''
        let lng = localStorage.getItem('lng') || ''
        let lat = localStorage.getItem('lat') || ''
        let subcat = localStorage.getItem('sub') || ''
        let type = localStorage.getItem('type') || ''
        this.api.setOrder(this.orderid,true,response.razorpay_payment_id,"Online",price,city,lng,lat,subcat,type).subscribe
        ((r:any) => {
            console.log("order created")
        })
        alert('the transactions was successful')
        window.location.replace("/home")

      },
      "order_id": "", 
      "prefill": {
          "name": "Gaurav Kumar",
          "email": localStorage.getItem('email'),
          //"contact": "9999999999"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
    };
    var rzpi
    options.amount=this.price+"00"
    options.name=this.name
   // options.order_id=this.orderid.toString()
    rzpi=new this.order.nativeWindow.Razorpay(options)
    rzpi.open()
    //rzpi.on('payment.success',this.success)
  }

  load(){
    this.name=localStorage.getItem('name')||''
    this.price=localStorage.getItem('price')||''
  }

  setDate(){
    let date=new Date()
    let x=date.getMonth()+1
    this.monthno=x
    switch(x){
      case 1:
        this.currmonth='Jan'
        break;
      case 2:
        this.currmonth='Feb'
        break;
      case 3:
        this.currmonth='Mar'
        break;
      case 4:
        this.currmonth='Apr'
        break;
      case 5:
        this.currmonth='May'
        break;
      case 6:
        this.currmonth='Jun'
        break;
      case 7:
        this.currmonth='Jul'
        break;
      case 8:
        this.currmonth='Aug'
        break;
      case 9:
        this.currmonth='Sep'
        break;
      case 10:
        this.currmonth='Oct'
        break;
      case 11:
        this.currmonth='Nov'
        break;
      case 12:
        this.currmonth='Dec'
        break;
        
    }
    this.day=date.getDate()
    x=date.getDay()
    switch(x){
      case 1:
        this.currweek='Mon'
        break;
      case 2:
        this.currweek='Tue'
        break;
      case 3:
        this.currweek='Wed'
        break;
      case 4:
        this.currweek='Thu'
        break;
      case 5:
        this.currweek='Fri'
        break;
      case 6:
        this.currweek='Sat'
        break;
      case 0:
        this.currweek='Sun'
        break;
            
    }
    console.log(this.day)
    console.log(this.currmonth)
    let prevweek=this.currweek
    let prevday=this.day
    let month=this.currmonth
    for(let i=0;i<7;i++){
      this.date[i]={
        day:prevday,
        week:prevweek,
        month:month
      }
      if(prevday<28)
          prevday=prevday+1;
      else if(prevday==28 && this.monthno==2)
          prevday=1
      else if(prevday==30 && (this.monthno==4)||(this.monthno==6)||(this.monthno==7)||(this.monthno==9))
          prevday=1
      else if(prevday==31)
        prevday=1
      else
        prevday=prevday+1
        
      if(prevday==1){
        if(month=='Jan')
          month='Feb'
        else if(month=='Feb')
          month='Mar'
        else if(month=='Mar')
        month='Apr'
        else if(month=='Apr')
        month='May'
        else if(month=='May')
        month='Jun'
        else if(month=='Jun')
        month='Jul'
        else if(month=='Jul')
        month='Aug'
        else if(month=='Aug')
        month='Sep'
        else if(month=='Sep')
          month='Oct'
        else if(month=='Oct')
        month='Nov'
        else if(month=='Nov')
        month='Dec'
        else if(month=='Dec')
        month='Jan'
         
      }

      if(prevweek=='Mon')
        prevweek='Tue'
      else if(prevweek=='Tue')
        prevweek='Wed'
      else if(prevweek=='Wed')
      prevweek='Thu'
      else if(prevweek=='Thu')
      prevweek='Fri'
      else if(prevweek=='Fri')
      prevweek='Sat'
      else if(prevweek=='Sat')
      prevweek='Sun'
      else if(prevweek=='Sun')
      prevweek='Mon'
    }

  }
}
