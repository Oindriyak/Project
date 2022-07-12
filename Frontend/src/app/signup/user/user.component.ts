import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private api:AppService) { }

  ngOnInit(): void {
  }
	
	
	name:string=""
	email:string=""
	pass:string=""
	ph:number=0
	err:string=""
	city:string=""
	submit(){
		let a=this.check()
		if(a==false)
			return
	this.api.setUser(this.email, this.pass,this.name,"user",this.ph,this.city).subscribe
		((r:any) => {
			console.log(r.data)
			if(r.status==true){
				//localStorage.setItem('name',r.data)
				console.log('Success')
				window.location.href = "/home"
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
		else
			return true
		return false
		
	}

}
