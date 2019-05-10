import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getCart(id, cartItems): Observable<any> {
    console.log('Order Service Triggered!');
    console.log(id, cartItems);
    return this.http.post(`${environment.ORDER_API_URL}/getCart/`, {id, cartItems});
  }

  placeOrder(id, cartItems, totalPrice): Observable<any> {
    return this.http.post(`${environment.ORDER_API_URL}/order/`, {id, cartItems, totalPrice});
  }

  getOrders(id): Observable<any> {
    return this.http.post(`${environment.ORDER_API_URL}/getOrders/`, {id});
  }

  orderDetails(userID, orderID): Observable<any> {
    return this.http.post(`${environment.ORDER_API_URL}/order/${orderID}`, {userID});
  }

}
