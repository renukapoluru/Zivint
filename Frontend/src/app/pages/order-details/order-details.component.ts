import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { AccountService } from 'src/app/services/account/account.service';
import { CartService } from 'src/app/services/order/cart/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderID;
  orderDetails;
  loaded = false;
  error = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private accountService: AccountService,
    private orderService: OrderService,
    private cartService: CartService) { }

  ngOnInit() {
    this.orderID = this.activeRoute.snapshot.params.id;
    this.getOrderDetails();
  }

  async getOrderDetails() {
    const userID = await this.accountService.getUser();
    this.orderService.orderDetails(userID, this.orderID).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in fetching Order Details.');
              this.loaded = false;
              this.error = true;
          } else {
              this.orderDetails = response.orderDetails;
              console.log(this.orderDetails);
              this.loaded = true;
              this.error = false;
          }
      },
      (error) => {
          this.error = false;
          console.log('Error in fetching Order Details.');
      }
    );
  }

  overallPrice(items) {
    const price = items.reduce((prev, next) => prev + (next.retail_price * next.quantity), 0);
    const formattedPrice = Math.floor((price * 105) / 100);
    return formattedPrice;
  }

  taxPrice(items) {
    const price = items.reduce((prev, next) => prev + (next.retail_price * next.quantity), 0);
    const formattedPrice = Math.floor((price * 5) / 100);
    return formattedPrice;
  }

  mrpPrice(items) {
    const price = items.reduce((prev, next) => prev + (next.retail_price * next.quantity), 0);
    const formattedPrice = Math.floor((price));
    return formattedPrice;
  }

  repeatOrder(order) {
    this.cartService.repeatOrder(order);
  }

}
