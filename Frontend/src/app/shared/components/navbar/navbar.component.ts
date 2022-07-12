import { Component, OnInit } from '@angular/core';
import {  trigger,  state,  style,  animate, 
		transition,} from '@angular/animations';
import { AppService } from 'src/app/shared/services/app.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
	animations: [
    trigger('login', [
      state('off', style({
        display:'none',
      })),
      state('on', style({
        display:'block',
		  
      })),
		
    ])
	
	
  ],
})
export class NavbarComponent implements OnInit {

  constructor(private api:AppService) { }

  ngOnInit(
	): void {
		this.load()
	  	
  }
	name:string=""
	email:string=""
	pass:string=""
	login:string="off"
	title:string=""
	revtitle:string="Sign in"
	err:string=""
	help:string='off'
	submit(){
		console.log("AA")
		this.api.checkUser(this.email, this.pass).subscribe
			((r:any) => {
				console.log(r.data)
				if(r.status==true){
					localStorage.setItem('name',r.data.name)
					localStorage.setItem('email',this.email)
					localStorage.setItem('type',r.data.type)
					localStorage.setItem('city',r.data.city)
					//this.name=r.data
					this.load()
					this.reverse()
					console.log('YAyy')
				}
				else
					this.err="Wrong username or password";
			})
	}
	reverse(){
		console.log(this.login)
		if(this.login=="off")
			this.login="on"
		else
			this.login="off"
	}
	off(){
		this.login="off"
	}
	load(){
		this.name=localStorage.getItem('name')|| ""
	}
	logout(){
		this.name=""
		localStorage.removeItem('name')
	}
	togglehelp(){
		if(this.help=='on')
			this.help='off'
		else
			this.help="on"
	}
}

