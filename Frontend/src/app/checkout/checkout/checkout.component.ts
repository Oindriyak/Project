import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import {  trigger,  state,  style,  animate, 
  transition,} from '@angular/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('type', [
      state('off', style({
        color:'#2be65a',
        backgroundColor:'white',
      })),
      state('on', style({
        backgroundColor:'#2be65a',
        color:'white',
		  
      })),
		
    ])
	
	
  ]
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router,private api:AppService ) { }

  ngOnInit(): void {
    //console.log(this.router.url);
    let x=this.router.url
    x=x.substring(x.indexOf('checkout')+9)
    this.cat=x.substring(0,x.indexOf('/')).replace('%20',' ')
    this.sub=x.substring(x.indexOf('/')+1).replace('%20',' ')
    console.log(this.cat + " " + this.sub)
    this.getcat()
  }
  sub:string=''
  cat:string=''
  subcat:any
  n:number=0
  unit:number=1
  cost:number=0
  price:number=0
  selected:number=0
  extra:string=''
  getcat(){

		this.api.getService().subscribe
			((r:any) => {
				if(r.status==true){
					let x=r.data
          for(let i in x){
            if(x[i].category.toUpperCase()==this.cat.toUpperCase()){
              
              for(let j of x[i].subcategory){
                console.log(j.name)  
                if(j.name.toUpperCase()==this.sub.toUpperCase()){
                  this.subcat=j
                  this.n=this.subcat.type.length
                  this.selected=0
                  this.price=this.subcat.type[0]
                  this.extra=this.subcat.type[this.selected].extrast
                  this.cost=this.extra=this.subcat.type[this.selected].price
                  console.log(this.extra=this.subcat.type[this.selected].extrast)
                  //this.price=
                  break
                }    
              }
              break
            }
            
            
          }
					//console.log(r.data)
					
				}
				else
					console.log("error")
			})
	}
  unitchange(c:number){
    if(this.unit+c>=1){  
      this.unit=this.unit + c;
      this.cost=this.unit *this.subcat.type[this.selected].price
      
    }

  }

  select(i:number){
      this.selected=i
      this.extra=this.subcat.type[this.selected].extrast
      this.cost=this.subcat.type[this.selected].price
  }
  submit(){
    
    localStorage.setItem('subcategory',this.subcat.name)
    localStorage.setItem('unit',this.unit.toString())
    localStorage.setItem('price',this.cost.toString())
    localStorage.setItem('sub',this.subcat.name)
    localStorage.setItem('type',this.subcat.type[this.selected].name)
    window.location.replace("/checkout/book")
  }

}
