import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CartService } from 'src/app/services/order/cart/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders = null;
  loaded = false;
  constructor(
    private accountService: AccountService,
    private cartService: CartService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  async getOrders() {
    const userID = await this.accountService.getUser();
    this.orderService.getOrders(userID).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in Fetching Orders.');
          } else {
              this.orders = response.orders;
              this.loaded = true;
          }
      },
      (error) => {
          console.log('Error in Fetching Orders.');
      }
  );
  }

  getTotalPrice(items) {
    const price = items.reduce((prev, next) => prev + (next.retail_price * next.quantity), 0);
    const formattedPrice = Math.floor((price * 105) / 100);
    return formattedPrice;
  }

  repeatOrder(order) {
    this.cartService.repeatOrder(order);
  }


}
