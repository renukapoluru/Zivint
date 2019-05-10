import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/order/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [];
  currentPageNumber = 1;
  filters = {
    searchText: 'NoSearch',
    brands: [],
    categories: [],
    sortbyPrice: 1
  };
  loaded = false;
  totalNoOfItems = 0;

  constructor(private productService: ProductService, private cartService: CartService  ) { }

  ngOnInit() {
    this.getProducts(this.filters);
  }

  getProducts(filters) {
    // tslint:disable-next-line:no-var-keyword
    filters.sortbyPrice = this.filters.sortbyPrice;
    this.filters = filters;
    let search = filters.searchText;
    const brands = filters.brands;
    const categories = filters.categories;
    const sortbyPrice = this.filters.sortbyPrice;
    if (search === '') {
      search = 'NoSearch';
    }
    this.productService.products(search, brands, categories, sortbyPrice, this.currentPageNumber ).subscribe(
        (response) => {
            if (response.error) {
                console.log('Error in fetching Products.');
            } else {
                this.products = response.Products;
                this.loaded = true;
                this.totalNoOfItems = response.TotalCount;
            }
        },
        (error) => {
            console.log('Error in fetching Products.');
        }
    );
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  getPage(page: number) {
    this.currentPageNumber = page;
    this.getProducts(this.filters);
  }

  getProductImage(images) {
    const productImages = JSON.parse(images);
    return productImages[0];
  }

  sortChanged(option) {
    this.filters.sortbyPrice = option;
    this.getProducts(this.filters);
  }

  formChanged(filters) {
    this.getProducts(filters);
  }

}
