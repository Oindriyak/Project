import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_API } from '../constants/url.constants';
import { PRO_API } from '../constants/url.constants';
import { SERVICE_API } from '../constants/url.constants';
import { ORDER_API } from '../constants/url.constants';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { 
  	 
  }
	//User
	checkUser(uname: string, pwd: string) {
    	let _body = {
      		username: uname,
      		password: pwd
    	}
    return this.http.patch(USER_API, _body)
  	}
	  
	getUser(uname: string) {
    return this.http.get(USER_API+'?username='+uname)
  	}
		
	setUser(uname: string, pwd: string,name:string,type:string,ph:number,city:string) {
    	let _body = {
      		username: uname,
      		password: pwd,
			name:name,
			type:type,
			ph:ph,
			city:city
    	}
    return this.http.post(USER_API, _body)
  	}	
	
	
	//Professional 
	checkPro(uname: string) {
    	let _body = {
      		username: uname,
    	}
    return this.http.patch(PRO_API, _body)
  	}
	getProInfo(uname: string) {
    	let _body = {
      		username: uname,
    	}
    return this.http.put(PRO_API, _body)
  	}
	  
	getPro(uname: string) {
    return this.http.get(PRO_API+'?username='+uname)
  	}
		
	setPro(uname: string,name:string,ph:number,city:string,address:string,position:any,subcat:Array<string>) {
    	let _body = {
      		username:uname,
			name:name,
			ph:ph,
			city:city,
			address:address,
			lat:position.lat.toString(),
			lng:position.lng.toString(),
			subcategory:subcat
		
    	}
    return this.http.post(PRO_API, _body)
  	}

	findPro(subcat:string) {
    	let _body = {
			subcategory:subcat
		
    	}
    return this.http.put(PRO_API, _body)
  	} 
	
	// Service
	getService() {
    return this.http.get(SERVICE_API)
  	}

	//Order
	createOrder(cname:String,cemail:String,date:string,time:string) {
		let _body={
			cemail: cemail,
			cname:cname,
			date:date,
			time:time
		}
		return this.http.patch(ORDER_API, _body)
	}

	setOrder(orderid:number,payementstatus:boolean,paymentid:string,paymenttype:string,price:number,city:string,lng:string,lat:string,subcat:string,type:string){
		let _body={
			orderid:orderid,
			payementstatus:payementstatus,
            paymentid:paymentid,
			price:price,
			paymenttype:paymenttype,
			city:city,
			lng:lng,
			lat:lat,
			subcat:subcat,
			type:type
		}
		return this.http.post(ORDER_API, _body)
	}
	
	getOrder(email:string,type:string,limit:number){
		let _body={
			email:email,
			type:type,
			limit:limit
		}
		return this.http.put(ORDER_API, _body)
	}

	acceptOrder(orderid:string,email:string,name:string,status:string){
		let _body={
			orderid:orderid,
			email:email,
			name:name,
			status:status
		}
		let a=ORDER_API+'/partner'
		return this.http.put(a, _body)
	}

	setRating(orderid:number,email:string,rating:number,review:string){
		let _body={
			email:email,
			rating:rating,
			review:review,
			orderid:orderid
		}
		let a=ORDER_API+'/partner'
		return this.http.post(a, _body)
	}
}
