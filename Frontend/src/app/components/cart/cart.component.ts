import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { CartService } from 'src/app/services/order/cart/cart.service';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = null;
  totalPrice = 0;
  loaded = false;
  constructor(
    private accountService: AccountService,
    private cartService: CartService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getCart();
  }

  async getCart() {
    const userID = await this.accountService.getUser();
    this.cartItems = await this.cartService.getItem('ZivintCart');
    userID != null ? this.getCartOnline(userID) : this.getLocalStorageCart();
  }

  async getLocalStorageCart() {
    this.loaded = true;
    this.getTotalPrice(this.cartItems);
    this.cartService.cartModified.subscribe((cart) => {
      this.cartItems = cart;
      this.getTotalPrice(this.cartItems);
    });
  }

  getCartOnline(userID) {
    this.orderService.getCart(userID, this.cartItems).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in Fetching Cart.');
          } else {
              this.cartItems = response.cartItems;
              this.cartService.removeLocalCart();
              this.loaded = true;
          }
      },
      (error) => {
          console.log('Error in Fetching Cart.');
      }
  );

  }

  getTotalPrice(items) {
    this.totalPrice = items.reduce((prev, next) => prev + (next.retail_price * next.quantity), 0);
  }

  formatPrice(n) {
    return Math.floor(n);
  }

  removeFromCart(id) {
    this.cartService.removeFromCart(id);
  }

}
