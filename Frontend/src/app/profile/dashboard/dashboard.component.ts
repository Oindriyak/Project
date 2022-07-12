import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import {  trigger,  state,  style,  animate, 
	transition,} from '@angular/animations';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { MapComponent } from 'src/app/shared/components/map/map.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
 // directives: [MapComponent],
  animations:[
	trigger('map', [
		state('off', style({
		  display:'none',
		  //position:'relative',
		  //zIndex:'4'
		})),
		state('on', style({
		  display:'block',
		  position:'fixed',
		  top:'25px',
		  //zIndex:'4'
		})),
		  
	  ])
  ]
})
export class DashboardComponent implements OnInit {
	@ViewChild(MapComponent) private child!:MapComponent;

  constructor(private api:AppService,private httpclient: HttpClient) { }

  ngOnInit(): void {
	 this.load()
  }
	
  detail:any={}
  	mapinp=false
	  position:any={lat:0,lng:0}
	  mapstate='off'
	name:string=localStorage.getItem('name')||" "
	type:string=localStorage.getItem('type')||" "
	email=localStorage.getItem('email')||" "
	subcategory=[]
	order:any
	limit=100
	rating:any=[]
	review:any=[]
  	address=""
	ph:number=0 
	request:any=[] 
  	porder:any=[]

	load(){
		let email=localStorage.getItem('email')||" "
		if(this.type!='pro'){
			this.api.getUser(email).subscribe
				((r:any) => {
          //console.log(r.data[0])
					this.detail=r.data[0]				
			})
			this.api.getOrder(email,"user",this.limit).subscribe
				((r:any) => {
          
					this.order=r.data
					console.log('User order',r.data)
					for(let i of this.order){
						this.rating.push(i.rating)
						this.review.push(i.review)
					}
					
					//if(r.data.rating){
					//	this.rating=r.data.rating
					//}
					//if(r.data.rating){
					//	this.review=this.order.rating
					//}				
			})
			
			return
		}
		else{
			this.api.getPro(email).subscribe((r:any)=>{
				//console.log(r)
				if(r.status==false){
					//console.log(r.data)
						this.detail=r.data[0]
						console.log("Detail",this.detail.requests);
						console.log("R.Data",r.data);
						this.api.getOrder(email,"pro",this.limit).subscribe
								((r:any) => {
									
									this.porder=r.data
									//this.request.push(r.data[0])
							})
						
						console.log("orders",this.porder)
						
						
						for(let i of this.detail.requests ){
							console.log(i)
							this.api.getOrder(i,"order",this.limit).subscribe
							((r:any) => {
								console.log("OOOOORDers",r.data)
								if(r.status){
									this.request.push(r.data)
									console.log("orderssss",r.data)
								}	
							})
						
							  
						}
					}
					

			})
			
			
			this.api.getOrder(email,"pro",this.limit).subscribe
				((r:any) => {
          	//console.log(r.data[0])
					this.order=r.data[0]
					
					if(r.data.rating){
						this.rating=r.data.rating
					}
					if(r.data.rating){
						this.review=this.order.rating
					}
					this.api.getUser(email).subscribe
					((r:any) => {
          //console.log(r.data[0])
						this.ph=r.data[0].ph				
					})
			

			})
			
		}
		
	}

	submitrating(){

	}

	outmap(event:any){
		//console.log('Yayy')

		this.mapstate='off'

	}
	map(i:any,s:string){
		if(s!='book'){
			this.position.lat=Number(this.porder[i].lat)
			this.position.lng=Number(this.porder[i].lng)
		}
		else{
			this.position.lat=Number(this.request[i].lat)
			this.position.lng=Number(this.request[i].lng)
		}
		//console.log(this.position)
		this.child.change()
		this.mapstate='on'

	}
	accept(i:number,status:string){
		console.log("Yayy")
		if(status=='assigned'){
			this.api.acceptOrder(this.request[i].orderid,this.email,this.name,status).subscribe(
				(r:any)=>{
					if(r.status==false)
					console.log("Not update")
				}

			)
		}
		else{
			this.api.acceptOrder(this.porder[i].orderid,this.email,this.name,status).subscribe(
				(r:any)=>{
					if(r.status==false)
					console.log("Not update")
				}

			)
		}
		

	}

	rateandreview(i:number){
		console.log(this.order[i])
		console.log("Yayy")
		this.api.setRating(this.order[i].orderid,this.order[i].pemail,this.rating[i],this.review[i]).subscribe(
			(r:any)=>{
				if(r.status==false)
					console.log("Rating update error");
					
			}
		)
	}
}
