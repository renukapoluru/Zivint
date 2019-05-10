import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CartService } from 'src/app/services/order/cart/cart.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressList = [{
    name: 'Renuka Poluru',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    phone: '7348870730',
    pincode: '52007'
  }];
  orderPlaced = null;
  addressForm: FormGroup;
  constructor(private router: Router, private accountService: AccountService, private cartService: CartService, private orderService: OrderService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addressForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]),
      pincode:  new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(8)])
    });
  }

  get addForm() {
    return this.addressForm.controls;
  }

  async confirmOrder() {
    const userID = await this.accountService.getUser();
    this.orderService.placeOrder(userID, this.cartService.cartItems, this.cartService.totalPrice).subscribe(
        (response) => {
            if (response.error) {
                console.log('Error in placing Order.');
            } else {
                this.orderPlaced = true;
                this.cartService.clearCart();
                setTimeout(() => {
                  this.orderPlaced = null;
                }, 3000);
            }
        },
        (error) => {
            console.log('Error in placing Order.');
        }
    );
  }

}
