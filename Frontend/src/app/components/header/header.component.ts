import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CartService } from 'src/app/services/order/cart/cart.service';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems = null;
  cartLength = null;
  searchTextChanged = new Subject();
  constructor(private router: Router, private accountService: AccountService, private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.checkCart();
  }

  async checkCart() {
    this.cartService.cartModified.subscribe((cart) => {
      this.cartItems = cart;
      this.cartLength = this.cartItems.length;
    });
  }

  async logout() {
    this.router.navigate(['/pages/home']);
    this.accountService.removeItem('currentUserID');
    const userID = await this.accountService.getUser();
    this.accountService.logout(userID).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in Logging Out User.');
          }
      },
      (error) => {
          console.log('Error in Logging Out User.');
      }
  );
  }


}
