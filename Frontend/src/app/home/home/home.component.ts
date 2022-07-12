import { Component, OnInit ,OnDestroy} from '@angular/core';
import {  trigger,  state,  style,  animate, 
		transition,} from '@angular/animations';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
	
	
  ],
})
export class HomeComponent implements OnInit ,OnDestroy{

  constructor(private api:AppService) { }

  ngOnInit(): void {
	  //console.log("Yayyyyyyyyy")
	  this.getcat()
  }
  ngOnDestroy():void{
	  
  }
 	mapinp=true
	link:string[][]=[[]]
	category:any[]=[]
	city:string=''
	position:any={lat:25,lng:87}
	change=false
	mapstate:string='off'
	getcat(){
		this.api.getService().subscribe
			((r:any) => {
				if(r.status==true){
					this.category=r.data
					console.log(r.data)
					for(let i in this.category){
						this.link[i][0]="#cat"+i.toString() 
						this.link[i][1]="cat"+i.toString()
						
					}
					console.log(this.link[0])
				}
				else
					console.log("error")
			})
	}
	center:any={lat:25,lng:86}
	outmap(event:any){
		//console.log('Yayy')
		if(event.change){
			//console.log(event)
			this.position=event.postion
			localStorage.setItem("lng",event.postion.lng)
			localStorage.setItem("lat",event.postion.lat)
			this.change=true
		}
		this.mapstate='off'
		console.log(this.position)

	}
	setmapstate(){
		console.log('mapstate')
		this.mapstate='on'
	}
	move(e:any,i:number){
	e.preventDefault();
    window.location.hash = "#cat" +i;
	}
	setcity(){
		localStorage.setItem("city",this.city)
	}
	
}
