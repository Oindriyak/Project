import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule} from '../shared/shared.module';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { BookComponent } from './book/book.component';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    BookComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class CheckoutModule { }
