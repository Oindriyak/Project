import { computeMsgId } from '@angular/compiler';
import { Component, OnInit,NgZone } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

declare const annyang: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  paymentHandler:any = null;
  ngOnInit(): void {
	  
  }

  //constructor(private order:OrderService) { }

  	voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
	count:number=0
  	answer:string=''
  constructor(private ngZone: NgZone){}

	initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err:any) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				if(this.voiceText==undefined)
				console.log("dioj dow ij a dioj ")
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
			if(this.count===0){  
				this.reply(queryText)
				//this.texttoSpeech(queryText)
				this.count++;
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
			synthesis = window.speechSynthesis;
			var sentence = new SpeechSynthesisUtterance(e);
			synthesis.speak(sentence);
		
		  } else {
			console.log('Text-to-speech not supported.');
		  }
			  

	}
	reply(question:string){
		let reply='Can not understand Please try again'
		let pattern=[]
		pattern.push([/hello/i,/hi/i,/hey/i])
		pattern.push([/payment methods/i,/payment method /i,/how to pay/i ,/various payment/i])
		pattern.push([/to book/i,/get an appointment/i,/get a service/i])
		pattern.push([/select location/i,/ current location/i,/choose location/i,/choose service location/i,/get location on map/i])
		pattern.push([/to login/i,/to sign in/i,/can we login/i,/i login/i])
		pattern.push([/to sign up/i,/register as user/i,/user registration/i,/customer registration/i])
		pattern.push([/sign up as professional/i,/sign up as partner/i,/register as prefessional/i,/register as partner/i,/register as a prefessional/i,/register as a partner/i])
		var isMatch=false		
		let x
		x=/hello|hi|hey/i
		isMatch=x.test(question)
		if(isMatch)
			reply="hello. how can i help you today "
		
		//isMatch = pattern[0].some(rx => rx.test(question));
		
		isMatch = pattern[1].some(rx => rx.test(question));
		if(isMatch)
			reply="We offer various payments methods.It includes debi and credit card , upi , net banking , vaarious wallets"
		
		isMatch = pattern[2].some(rx => rx.test(question));
		if(isMatch)
			reply="Select your location and select your required service in home page. Then if professionals are present select no of units or persons. Then select date and time of service and select payment method to book a service "
		
		isMatch = pattern[3].some(rx => rx.test(question));
		if(isMatch)
			reply="Select you location on the home page under location heading. On the popupmap you can get your current locatoin using gps marker and mark the locatiion for service using marker"
		
		isMatch = pattern[4].some(rx => rx.test(question));
		if(isMatch)
			reply='Click on the Login/Sign up button on the top of the page and enter correct credentials to log in to the website.'
			isMatch = pattern[5].some(rx => rx.test(question));
		if(isMatch)
			reply="Click on the Login/Sign up button on the top of the page and click on the Sign up link on the popup .One the new opened page enter correct requiired information to sign up to the website"
				
		isMatch = pattern[6].some(rx => rx.test(question));
		if(isMatch)
			reply="Click on the register as professional on the top of the page and fill up various details on the newly opened page to register as a professional."
		
			
		
		pattern.push([/ cancel booking/i,/to cancel booking/i])
		isMatch = pattern[7].some(rx => rx.test(question))
		if(isMatch)
			reply='Search the booking you want to cancel on dashborad, click on the cancel button,give reason and confirm'
		
		pattern.push([/contact with professionals/i,/contact professional/i,/contact with professional/i,/contact professionals/i,/contact partner/i,/contact with partner/i])
		isMatch = pattern[8].some(rx => rx.test(question));
		if(isMatch)
			reply='contact details are shared with your booking section'
		
			pattern.push([/rate and review the services/i,/rate service/i,/review a service/i])
		isMatch = pattern[9].some(rx => rx.test(question));
		if(isMatch)
			reply='after each service is completed, web provide a rate and feedback section'
		
		pattern.push([/refund cancel bookings/i,/refund policy/i])
		isMatch = pattern[10].some(rx => rx.test(question));
		if(isMatch)
			reply='on cancellation of a request the refund will automatically intiated within 5-7days'
		
		pattern.push([/about service warrenty/i])
		isMatch = pattern[11].some(rx => rx.test(question));
		if(isMatch)
			reply='we provide a 15 days service warrenty and insaurance upto 10,000 on any damages,it varies service to service '
		
		this.answer=reply
			
		this.texttoSpeech(reply)
				
	}
}