import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { BookComponent } from './book/book.component';
import { OrderComponent } from './order/order.component';
const routes: Routes = [
  {
    
    path:'book',
    component:BookComponent,
  },
  {
    path:'order',
    component:OrderComponent,
  },
  {
		path :'**',
		component:CheckoutComponent,
		
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
