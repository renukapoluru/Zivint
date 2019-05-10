import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  searchProduct(searchterm): Observable<any> {
    return this.http.get(`${environment.PRODUCT_API_URL}/searchProduct/${searchterm}`);
  }

  products(search, brands, categories,  sortbyPrice, pageNo): Observable<any> {
    return this.http.post(`${environment.PRODUCT_API_URL}/products/${pageNo}`, {search, brands, categories, sortbyPrice});
  }

  getFilterData(): Observable<any> {
    return this.http.get(`${environment.PRODUCT_API_URL}/filterData/`);
  }

  productDetails(id): Observable<any> {
    return this.http.get(`${environment.PRODUCT_API_URL}/productDetails/${id}`);
  }

}
