import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { VoiceComponent } from './voice/voice.component';

const routes: Routes = [
	
	{
		path:'home',
		 loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
	},
	{
		path:'signup',
		loadChildren: () => import('./signup/signup.module').then(a => a.SignupModule)
		
	},
	{
		path:'profile',
		loadChildren: () => import('./profile/profile.module').then(a => a.ProfileModule)
	},
	{
		
		path:'checkout',
		loadChildren: () => import('./checkout/checkout.module').then(a => a.CheckoutModule)
	},
	{
		path:'voice',
		loadChildren:()=>import('./voice/voice.module').then(a => a.VoiceModule)
	},
	
	{
		path:'**',
		redirectTo:'home',
		pathMatch:'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
