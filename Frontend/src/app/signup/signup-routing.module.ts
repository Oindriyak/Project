import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import {ProComponent} from './pro/pro.component';
const routes: Routes = [
	{
		path :'user',
		component:UserComponent
	},
	{
		path:'pro',
		component:ProComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
