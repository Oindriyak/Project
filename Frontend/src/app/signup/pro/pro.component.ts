import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

import {  trigger,  state,  style,  animate, 
	transition,} from '@angular/animations';
@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css'],
  animations: [
    trigger('login', [
      state('off', style({
        display:'none',
      })),
      state('on', style({
        display:'block',
      })),
		
    ]),
	trigger('map', [
		state('off', style({
		  display:'none',
		  position:'relative',
		})),
		state('on', style({
		  display:'block',
		  position:'fixed',
		  top:'25px',
		})),
		  
	  ])
	
	
  ],
})
export class ProComponent implements OnInit {

  constructor(private api:AppService) { }

  ngOnInit(): void {
	this.getcat()
  }
	
	name:string=""
	email:string=""
	pass:string=""
	ph:number=0
	err:string=""
	city:string=""
	address:string=""
	position:any={lat:25,lng:87}
	change=false
	mapstate:string='off'
	category:any[]=[]
	vaccine:number=0
	mapinp=true
	submit(){
		let a=this.check()
		if(a==false)
			return
	this.api.setUser(this.email, this.pass,this.name,"pro",this.ph,this.city).subscribe
		((r:any) => {
			console.log(r.data)
			if(r.status==true){
				//localStorage.setItem('name',r.data)
				this.pro()				
				console.log('Success')
				//window.location.href = "/home"
			}
			else
				this.err="Email id already exists";
		})

	}
	check(){
		if(this.name=="")
			this.err="Name missing"
		else if(this.email=="")
			this.err="Enter email"
		else if(this.pass=="")
			this.err="Enter password"
		else if(this.ph==0 || this.ph<1000000000 || this.ph>9999999999)
			this.err="Enter correct ph number"
		else if(this.city=="")
			this.err="Enter City"
		else if(this.address=="")
			this.err="Enter Address"
		
		else
			return true
		return false
		
	}
	pro(){
		let subcat:Array<string>=[]
		for(let i in this.category){
			if(this.category[i].checked==true){
				for(let j in this.category[i].subcategory){
					if(this.category[i].subcategory[j].checked==true)
						subcat.push(this.category[i].subcategory[j].name)
				}
			}
		}
		if(subcat.length== 0){
			this.err="Enter services "
			return
		}

		this.api.setPro(this.email, this.name,this.ph,this.city,this.address,this.position,subcat).subscribe
		((r:any) => {
			console.log(r.data)
			if(r.status==true){
				//localStorage.setItem('name',r.data)
				console.log('Saccess')
				window.location.href = "/home"
			}
			else
				this.err="Email id already exists";
		})

	}

	outmap(event:any){
		//console.log('Yayy')
		if(event.change){
			//console.log(event)
			this.position=event.postion
			this.change=true
		}
		this.mapstate='off'
		console.log(this.position)

	}
	setmapstate(){
		console.log('mapstate')
		this.mapstate='on'
	}

	getcat(){
		this.api.getService().subscribe
			((r:any) => {
				if(r.status==true){
					this.category=r.data
					console.log(r.data)
					for(let i in this.category){
						this.category[i].checked=false
						for(let j in this.category[i].subcategory)
							this.category[i].subcategory[j].checked=false
					}
					console.log(this.category)
				}
				else
					console.log("error")
			})
	}
	catselcted(i:number){
		this.category[i].checked=!this.category[i].checked

	}
	subcatselected(i:number ,j:number){
		this.category[i].subcategory[j].checked=!this.category[i].subcategory[j].checked		
	}

	selectvac(i:number){
		this.vaccine=i
	}
	

}
