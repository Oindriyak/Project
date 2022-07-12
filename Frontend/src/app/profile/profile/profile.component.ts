import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private api:AppService) { }

  ngOnInit(): void {
	  this.load()
  }
	details:any
	email:string=localStorage.getItem('email')||""
	name:string=localStorage.getItem('name')||" "
	type:string=localStorage.getItem('type')||" "
	subcategory=[]
	load(){
		let email=localStorage.getItem('email')||" "
		if(this.type!='pro'){
			this.api.getUser(email).subscribe
				((r:any) => {
					this.details=r.data				
			})
			return
		}
		else{
			this.api.getPro(email).subscribe((r:any)=>{
				if(r.staus==true){
					this.details=r.data
				}

			})
		}
		
	}
}
