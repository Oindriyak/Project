import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { UserComponent } from './user/user.component';
import { ProComponent } from './pro/pro.component';
import { SharedModule} from '../shared/shared.module'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    ProComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
	  SharedModule,
	  FormsModule
  ]
})
export class SignupModule { }
