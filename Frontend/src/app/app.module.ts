import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    //VoiceComponent,
    
  ],
  imports: [
    BrowserModule,
	  HttpClientModule,
    AppRoutingModule,
	  BrowserAnimationsModule,
	  SharedModule,
	  FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
