import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { OrderService } from '../order.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = [];
  totalPrice = 0;
  cartModified = new Subject();
  userLoggedIn: boolean;
  constructor(
    private accountService: AccountService,
    private orderService: OrderService
    ) {
    this.getCart();
    this.userLoggedIn = this.accountService.userLoggedIn;
  }

   async getCart() {
    this.cartItems = await this.getItem('ZivintCart');
    if (!this.userLoggedIn) {
      this.cartModified.next(this.cartItems);
    } else {
      const currentUserID = await this.accountService.getUser();
      this.orderService.getCart(currentUserID, this.cartItems).subscribe(
        (response) => {
            if (response.error) {
                console.log('Error in fetching Cart.');
            } else {
                this.cartItems = response.cartItems;
                this.totalPrice = this.cartItems.reduce((prev, next) => prev + (next.retail_price * next.quantity), 0);
            }
        },
        (error) => {
            console.log('Error in fetching Cart.');
        }
      );
    }
   }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('ZivintCart');
    this.cartModified.next(this.cartItems);
  }

  setItem({ key, value }: { key: string, value: any}) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  getItem(key: any): Promise<[]> {
    return new Promise((resolve, reject) => {
      try {
        const value = localStorage.getItem(key);
        (typeof value === 'string' || value === null) ? resolve(JSON.parse((value === null || value === '') ? '[]' : value)) : reject(false);
      } catch (error) {
        reject(error);
      }
    });
  }


  async addToCart(product) {

    if (!this.userLoggedIn) {
      const cartLS = await this.getItem('ZivintCart');
      this.cartItems = cartLS;
      const index = this.cartItems.findIndex((e) => e.uniq_id === product.uniq_id);
      if (index === -1) {
          product.quantity = 1;
          this.cartItems.push(product);
      } else {
        this.cartItems[index].quantity = this.cartItems[index].quantity + 1;
      }
      this.setItem({
        key: 'ZivintCart',
        value: this.cartItems
      });
      this.cartModified.next(this.cartItems);
    }

  }

  async removeFromCart(id) {

    if (!this.userLoggedIn) {
      const cartItems = await this.getItem('ZivintCart');
      this.setItem({
        key: 'ZivintCart',
        value: this.cartItems
      });
      const index = this.cartItems.findIndex((e) => e.uniq_id === id);
      this.cartItems.splice(index, 1);
      this.setItem({
        key: 'ZivintCart',
        value: this.cartItems
      });
      this.cartModified.next(this.cartItems);
    }

  }

  removeLocalCart() {
    localStorage.removeItem('ZivintCart');
  }

  async repeatOrder(orderList) {
    const completeList = this.cartItems.concat(orderList);
    console.log(completeList);
    const filteredList = [];
    await completeList.forEach((item) => {
      const i = filteredList.findIndex(x => x.uniq_id === item.uniq_id);
      i <= -1 ? filteredList.push(item) : item.quantity = item.quantity + 1;
    });
    this.cartItems = filteredList;
    this.setItem({
      key: 'ZivintCart',
      value: this.cartItems
    });
    this.cartModified.next(this.cartItems);
  }

  cart(userID) {
    this.orderService.getCart(userID, this.cartItems);
  }

}
