import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { HelpComponent } from './components/help/help.component';


@NgModule({
  declarations: [
    NavbarComponent,
    MapComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
	 
	  FormsModule
  ],
	exports:[
		NavbarComponent,
    MapComponent,
    HelpComponent
	]
})
export class SharedModule { }
