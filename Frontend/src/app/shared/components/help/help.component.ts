import { computeMsgId } from '@angular/compiler';
import { Component, OnInit,NgZone,Output ,EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

declare const annyang: any;
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  
  paymentHandler:any = null;
  ngOnInit(): void {
	  
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
	constructor(private ngZone: NgZone){}

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
          this.answer="Can you please repeat"
          this.texttoSpeech("Can you please repeat")
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
		let x
		let reply='Can not understand Please try again'
		
		
		x=/What is age|age|tell your age/i
		isMatch=x.test(question)
		if(isMatch)
		reply="My developer build me in past few weeks ago , so they know better"
		x=/can i afford|affordable service/i
		isMatch=x.test(question)
		if(isMatch)
		reply="all our services are affordable and minimum cost optimize,a middle class man can afford it"
		x=/is it trustworthy|serviceproviders are trustful/i
		isMatch=x.test(question)
		if(isMatch)
		reply="Yes,we verify their profile and their service background and also recognize their work history"
		x=/feedback|service experience/i
		isMatch=x.test(question)
		if(isMatch)
		reply="After the completion of the service we provide a feedback report and you submit your experience and suggest us with extra features"
		x=/availability|service available/i
		isMatch=x.test(question)
		if(isMatch)
		reply="we are available 24*7 for booking"
		x=/how to cancel service/i
		isMatch=x.test(question)
		if(isMatch)
		reply="After the booking of service two option are available one to pay another to cancel by clicking cancel you can cancel service booking"
		x=/refund policy|refund/i
		isMatch=x.test(question)
		if(isMatch)
		reply="after cancelation of service amount is refunded within 24 hours"
		x=/location verification/i
		isMatch=x.test(question)
		if(isMatch)
		reply="by using device current location you can see your and the service providers current location"
		x=/how many payment options|payment methods/i
		isMatch=x.test(question)
		if(isMatch)
		reply="we have both facilities : offline mode and online mode"
		x=/what is your gender|gender/i
		isMatch=x.test(question)
		if(isMatch)
		reply="I am a bot function with male voice"
		x=/cleaning methods/i
		isMatch=x.test(question)
		if(isMatch)
		reply="we have multiple cleaning methods regarding floor,chair,table,vehicles etc"
		x=/installation/i
		isMatch=x.test(question)
		if(isMatch)
		reply="we provide any kind of installation in your home appliances "
		x=/servicing/i
		isMatch=x.test(question)
		if(isMatch)
		reply="any kind of electronics servicing are available with 30 days warranty"
		x=/any damage|wrong service related issue/i
		isMatch=x.test(question)
		if(isMatch)
		reply="any damage occur,we provide 100% refund with reliable proof"
		x=/salon|parlour/i
		isMatch=x.test(question)
		if(isMatch)
		reply="we provide any kind of salone facility for unisex like hair cutting,shaving,waxing,manicure,pedicure,facial etc"
		x=/repair/i
		isMatch=x.test(question)
		if(isMatch)
		reply="we provide multiple repairing option as per your need"
		x=/pest control/i
		isMatch=x.test(question)
		if(isMatch)
		reply="pest control are done by highly professional workmen"
		
		
		
		
		
		
		
		
		
		
		let pattern=[]
		pattern.push([/hello/i,/hi/i,/hey/i])
		pattern.push([/payment methods/i,/payment method /i,/how to pay/i ,/various payment/i,/various ways to pay/])
		pattern.push([/to book/i,/get an appointment/i,/get a service/i])
		pattern.push([/select location/i,/ current location/i,/choose location/i,/choose service location/i,/get location on map/i])
		pattern.push([/to login/i,/to sign in/i,/can we login/i,/i login/i])
		pattern.push([/to sign up/i,/register as user/i,/user registration/i,/customer registration/i])
		pattern.push([/sign up as professional/i,/sign up as partner/i,/register as professional/i,/register as partner/i,/register as a prefessional/i,/register as a partner/i])
		var isMatch=false		
		
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
		
			pattern.push([/rate and review the services/i,/rate service/i,/review a service/i,/rate/i,/review/i])
		isMatch = pattern[9].some(rx => rx.test(question));
		if(isMatch)
			reply='after each service is completed, web provide a rate and feedback section'
		
		pattern.push([/refund cancel bookings/i,/refund policy/i])
		isMatch = pattern[10].some(rx => rx.test(question));
		if(isMatch)
			reply='on cancellation of a request the refund will automatically intiated within 5-7days'
		
		pattern.push([/service warranty|warranty/i])
		isMatch = pattern[11].some(rx => rx.test(question));
		if(isMatch)
			reply='we provide a 15 days service warrenty and insaurance upto 10,000 on any damages,it varies service to service '
		
		this.answer=reply
			
		this.texttoSpeech(reply)
				
	}
}