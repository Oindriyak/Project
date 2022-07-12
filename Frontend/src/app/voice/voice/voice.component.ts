import { computeMsgId } from '@angular/compiler';
import { Component, OnInit,NgZone,Output ,EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

import { AppService } from 'src/app/shared/services/app.service';
declare const annyang: any;
@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent implements OnInit {
  
  paymentHandler:any = null;
  ngOnInit(): void {
    this.currentpage='home-initial'
    this.load()
    this.assist()	  
  }
  @Output() out = new EventEmitter<any>()
  //constructor(private order:OrderService) { }

  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
	count:number=0
  	answer:string='How can I help you today'
	constructor(private ngZone: NgZone,private api:AppService){}

  currentpage='home-initial'
  userdet:any={}
  cat:any

  load(){
    this.api.getService().subscribe
			((r:any) => {
				if(r.status==true){
					this.cat=r.data
        }
      })
  }


  close(){
		  this.out.emit({animate:"off"})
	  }
	initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err:any) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				if(this.voiceText==undefined){
          //this.answer="Can you please repeat"
          //this.texttoSpeech("Can you please repeat.")
          //this.startVoiceRecognition()
        }
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res:any) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid:any) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();
				
      		this.voiceText = queryText;
			if(this.count==0){  
        this.reply(queryText)

				//this.texttoSpeech(queryText)
				this.count=2;
			}  
			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      		this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});

		annyang.addCallback('resultNoMatch', function(phrases:any) {
			console.log("I think the user said: ", phrases[0]);
			console.log("But then again, it could be any of the following: ", phrases);
			console.log("Idiot")
		});
	}

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.count=0
    this.voiceText = undefined;

		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.count=0
		this.voiceText = undefined;

		if(annyang){
      annyang.abort();
    }
	}
	texttoSpeech(e:string){
		console.log(e)
		var synthesis
		if ('speechSynthesis' in window) {
			if(e!='end'){
        synthesis = window.speechSynthesis;
			  var sentence = new SpeechSynthesisUtterance(e);
        synthesis.speak(sentence);
        return
      }
      else{
        synthesis = window.speechSynthesis;
			  var sentence = new SpeechSynthesisUtterance(e);
        synthesis.speak(sentence);
        sentence.onend= ()=>{
          this.startVoiceRecognition()
        }

      }
          

      
		  } else {
			console.log('Text-to-speech not supported.');
		  }
			  

	}
	reply(question:string){
		let x
    console.log("question:",question)
		let reply='Can not understand . Repeating the question'  
		if(this.currentpage=='home-initial'){
      x=/one|1/i
      if(x.test(question)==true){
        
        console.log(question ,'home init')
        this.currentpage='home-location'
        this.assist()
        return
      }
      x=/two|to|tu|to||2/i
      if(x.test(question)==true){
        this.currentpage='dashboard'
        this.assist()
        return
      }
      x=/three|3/i
      if(x.test(question)==true){
        this.texttoSpeech('Logging out')
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        window.location.href='../home'
        return
      }
      x=/four|4|for/i
      if(x.test(question)==true){
        
        this.currentpage='home-initial'
        this.assist()
        return
      }
    }
    
    if(this.currentpage=='home-location'){
      x=/one|1/i
      if(x.test(question)==true){
        this.currentpage='home-service'
        navigator.geolocation.getCurrentPosition( (position)=>{
          
          this.userdet.lat=position.coords.latitude
          this.userdet.lng=position.coords.longitude
        })
        //this.userdet.position()
        this.assist()
        return
      }
      x=/two|to|tu|to||2/i
      if(x.test(question)==true){
        this.currentpage='home-initial'
        this.assist()
        return
      }
      x=/three|3/i
      if(x.test(question)==true){
        this.texttoSpeech('Logging out')
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        window.location.href='../home'
        return
      }
      x=/four|4|for/i
      if(x.test(question)==true){
        this.currentpage='home-location'
        this.assist()
        return
      }
    }


    if(this.currentpage=='home-service'){
      let l=this.cat.length
      let a=[/one|1/i,/two|to|tu|to||2/i,/three|3/i,/four|for|4/i,/five|5/i,/six|6/i,/seven|7/i,/eight|8/i,/nine|9/i,/ten|10/i,/eleven|11/i]
      for(let i=0;i<l;i++){
        if(a[i].test(question)==true){
          console.log(a[i])
          this.currentpage='home-subcat'
          this.userdet.cat=i;
          this.assist()
          return
        }
      }
      
      x=a[l]
      if(x.test(question)==true){
        this.currentpage='home-initial'
        this.assist()
        return
      }
      x=a[l+1]
      if(x.test(question)==true){
        this.currentpage='home-service'
        this.assist()
        return
      }

    }

    //subcategory

    if(this.currentpage=='home-subcat'){
      console.log(this.cat[this.userdet.cat].subcategory.length)
      console.log(this.userdet.cat)
      let l=this.cat[this.userdet.cat].subcategory.length
      let a=[/one|1/i,/two|to|tu|to||2/i,/three|3/i,/four|for|4/i,/five|5/i,/six|6/i,/seven|7/i,/eight|8/i,/nine|9/i,/ten|10/i,/eleven|11/i]
      for(let i=0;i<l;i++){
        if(a[i].test(question)==true){
          this.currentpage='home-type'
          this.userdet.subcategory=this.cat[this.userdet.cat].subcategory[i].name;
          this.userdet.subcat=this.cat[this.userdet.cat].subcategory[i];
          this.assist()
          return
        }
      }
      
      x=a[l]
      if(x.test(question)==true){
        this.currentpage='home-initial'
        this.assist()
        return
      }
      x=a[l+1]
      if(x.test(question)==true){
        this.currentpage='home-subcat'
        this.assist()
        return
      }

    }

    //type
    
    if(this.currentpage=='home-type'){
      let l=this.userdet.subcat.type.length
      let a=[/one|1/i,/two|to|tu|to||2/i,/three|3/i,/four|for|4/i,/five|5/i,/six|6/i,/seven|7/i,/eight|8/i,/nine|9/i,/ten|10/i,/eleven|11/i]
      for(let i=0;i<l;i++){
        if(a[i].test(question)==true){
          this.currentpage='date'
          this.userdet.type=this.userdet.subcat.type[i].name;
          this.userdet.ty=this.userdet.subcat.type[i];
          this.userdet.price=this.userdet.subcat.type[i].price;
          this.texttoSpeech(this.userdet.subcat.type[i].details)
          /*if(this.userdet.ty.extra == 'true'){
            let y='extra charges may be applied'
            this.texttoSpeech(y)
          }*/
          this.assist()
          return
        }
      }
      
      x=a[l]
      if(x.test(question)==true){
        this.currentpage='home-initial'
        this.assist()
        return
      }
      x=a[l+1]
      if(x.test(question)==true){
        this.currentpage='home-type'
        this.assist()
        return
      }

    }

    // date
    if(this.currentpage=='date'){
      x=/one|1/i
      if(x.test(question)==true){
        this.finddate(0)
        this.currentpage='time'
        this.assist()
        return
      }
      x=/two|to|tu|2|tu/i
      if(x.test(question)==true){
        this.finddate(1)
        this.currentpage='time'
        this.assist()
        return
      }
      
      x=/three|3/i
      if(x.test(question)==true){
        this.finddate(2)
        this.currentpage='time'
        this.assist()
        return
      }

      x=/four|for|4/i
      if(x.test(question)==true){
        this.finddate(3)
        this.currentpage='time'
        this.assist()
        return
      }

      x=/five|5/i
      if(x.test(question)==true){
        this.texttoSpeech('Logging out')
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        window.location.href='../home'
        return
      }
      x=/six|6/i
      if(x.test(question)==true){
        this.currentpage='date'
        this.assist()
        return
      }
      
      x=/seven|7/i
      if(x.test(question)==true){
        this.currentpage='home-initial'
        this.assist()
      }
      
    }

    //time
    if(this.currentpage=='time'){
      x=/one|1/i
      if(x.test(question)==true){
        this.userdet.time='09:00 AM - 12:00 PM'
        this.currentpage='submit'
        this.submit()
        return
      }
      
      x=/two|to|tu|2/i
      if(x.test(question)==true){
        this.userdet.time='12:00 PM - 03:00 PM'
        this.currentpage='submit'
        this.submit()
        return
      }

      x=/three|3/i
      if(x.test(question)==true){
        this.userdet.time='03:00 PM - 06:00 PM'
        this.currentpage='submit'
        this.submit()
        return
      }

      x=/four|4/i
      if(x.test(question)==true){
        this.userdet.time='06:00 PM - 09:00 PM'
        this.currentpage='submit'
        this.submit()
        return
      }

      x=/five|5/i
      if(x.test(question)==true){
        this.currentpage='date'
        this.assist()
        return
      }
      
      x=/six|6/i
      if(x.test(question)==true){
        this.currentpage='home-initial'
        this.assist()
      }



    }




	}

  async assist(){
    console.log('assist')
    let options=''
    if(this.currentpage=='home-initial'){
       this.texttoSpeech('Say one to book a service')
       //this.texttoSpeech('Say two to see last booked service status')
       this.texttoSpeech('Say three to log out ')
       this.texttoSpeech('Say four to repeat ')
      this.texttoSpeech('end')
      return

    }

    if(this.currentpage=='home-location'){
      this.texttoSpeech('Say one to get current location and continue')
      this.texttoSpeech('Say two to go back to previous options')
      this.texttoSpeech('Say three to log out ')
      this.texttoSpeech('Say four to repeat ')
      this.texttoSpeech('end')
      return
    }
    
    if(this.currentpage=='home-service'){
      let x= 'Say'
      let i=0;
      for(  i=1 ;i <=this.cat.length;i++){
        x='Say '
        x=x+ i + ' for ' + this.cat[i-1].category
        this.texttoSpeech(x) 
      }
      x= 'Say '+ i + 'to start from start' 
      this.texttoSpeech(x)
      i++
      x= 'Say '+ i + 'to repeat ' 
      this.texttoSpeech(x)
      this.texttoSpeech('end')
      return
    }

    if(this.currentpage=='home-subcat'){
      let x= 'Say'
      let i=0;
      let subcategory=this.cat[this.userdet.cat].subcategory
      for(  i=1 ;i <=subcategory.length;i++){
        x='Say '
        x=x+ i + ' for ' + subcategory[i-1].name
        this.texttoSpeech(x) 
      }
      x= 'Say '+ i + 'to start from start' 
      this.texttoSpeech(x)
      i++
      x= 'Say '+ i + 'to repeat ' 
      this.texttoSpeech(x)
      this.texttoSpeech('end')
      return
    }


    if(this.currentpage=='home-type'){
      let x= 'Say'
      let i=0;
      let type=this.userdet.subcat.type
      for(  i=1 ;i <= type.length;i++){
        x='Say '
        x=x+ i + ' for ' + type[i-1].name + ' with cost ' + type[i-1].price +' rupees'
        this.texttoSpeech(x) 
      }
      x= 'Say '+ i + 'to start from start' 
      this.texttoSpeech(x)
      i++
      x= 'Say '+ i + 'to repeat ' 
      this.texttoSpeech(x)
      this.texttoSpeech('end')
      return
    }


    

    //select date
    if(this.currentpage=='date'){
      this.texttoSpeech('Say one to book the service for today')
      this.texttoSpeech('Say two to book the service for tommrow')
      this.texttoSpeech('Say three to book the service for day after tommrow')
      let date = new Date();
      let day=(date.getDay()+3)%7
      if(day==0)
        this.texttoSpeech('Say four to to book the service on sunday')
      else if(day==1)
      this.texttoSpeech('Say four to book the service on Monday')
      else if(day==2)
      this.texttoSpeech('Say four to book the service on Tuesday')
      else if(day==3)
      this.texttoSpeech('Say four to book the service on Wednesday')
      else if(day==4)
      this.texttoSpeech('Say four to book the service on Thursday')
      else if(day==5)
      this.texttoSpeech('Say four to book the service on Friday')
      else if(day==6)
      this.texttoSpeech('Say four to to book the service on Saturday')

      this.texttoSpeech('Say five to log out ')
      this.texttoSpeech('Say six to repeat ')
      this.texttoSpeech('Say seven to start from beginning')     
      this.texttoSpeech('end')
      return
    }

    //select time
    if(this.currentpage=='time'){
      this.texttoSpeech('Say one to get your service between 9 am and 12 pm and book the service')
      this.texttoSpeech('Say two to get your service between 12 pm and 3 pm and book the service')
      this.texttoSpeech('Say three to get your service between 3 pm and 6 pm and book the service')
      this.texttoSpeech('Say four to get your service between 6 pm and 9 pm and book the service')
      this.texttoSpeech('Say five to repeat ')
      this.texttoSpeech('Say six to start from beginning')     
      this.texttoSpeech('end')
      return
    }


  }

  finddate(i:number){
    let currmonth
    let date= new Date()  
    let x=date.getMonth()+1
    let monthno=x
    switch(x){
      case 1:
        currmonth='Jan'
        break;
      case 2:
        currmonth='Feb'
        break;
      case 3:
        currmonth='Mar'
        break;
      case 4:
        currmonth='Apr'
        break;
      case 5:
        currmonth='May'
        break;
      case 6:
        currmonth='Jun'
        break;
      case 7:
        currmonth='Jul'
        break;
      case 8:
        currmonth='Aug'
        break;
      case 9:
        currmonth='Sep'
        break;
      case 10:
        currmonth='Oct'
        break;
      case 11:
        currmonth='Nov'
        break;
      case 12:
        currmonth='Dec'
        break;
        
    }
    let currweek
    let day=date.getDate()
    x=(date.getDay() +i)%7
    switch(x){
      case 1:
        currweek='Mon'
        break;
      case 2:
        currweek='Tue'
        break;
      case 3:
        currweek='Wed'
        break;
      case 4:
        currweek='Thu'
        break;
      case 5:
        currweek='Fri'
        break;
      case 6:
        currweek='Sat'
        break;
      case 0:
        currweek='Sun'
        break;
            
    }
    let d=[];
    let prevweek=currweek
    let prevday=day
    let month=currmonth
    for(let i=0;i<7;i++){
      d[i]={
        day:prevday,
        week:prevweek,
        month:month
      }
      if(prevday<28)
          prevday=prevday+1;
      else if(prevday==28 && monthno==2)
          prevday=1
      else if(prevday==30 && (monthno==4)||(monthno==6)||(monthno==7)||(monthno==9))
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
    this.userdet.date= d[i].month + ' '+ d[i].day + ' ' + d[i].week



  }

  submit(){
    let name=localStorage.getItem('name')||''
    let email=localStorage.getItem('email')||''
    let orderid=0
    this.api.createOrder(name,email,this.userdet.date,this.userdet.time).subscribe((r:any)=>{
          if(r.status==true){
            orderid=r.orderid
            console.log(this.userdet)
            var city=localStorage.getItem("city")||'Kalyani'
            this.api.setOrder(orderid,false,'NA','Cash on service',this.userdet.price,city, this.userdet.lng,this.userdet.lat,this.userdet.subcategory,this.userdet.type).subscribe((r:any)=>{
              if(r){
                this.texttoSpeech('Your service has been booked')
              }
              else
                console.log('set order error')
            })
            
          }
          else{
            console.log(' create order error')
          } 
        })
    }
    
}