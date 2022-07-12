import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SharedModule} from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
//import { MapComponent } from './map/map.component';
//import { MapComponent } from './map/map.component'

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    CategoryComponent,
    //MapComponent,
  //  MapComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
	  FormsModule,
	  SharedModule
  ]
})
export class HomeModule { }
