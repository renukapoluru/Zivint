import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/order/cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productFound = false;
  productID = null;
  productDetails;
  productImages = [];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true
  };

  constructor(private activeRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService
            ) {
    this.productID = this.activeRoute.snapshot.params.id;
    this.getProductDetails();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
        this.productID = params.id;
        this.getProductDetails(); // reset and set based on new parameter this time
    });
  }

  getProductDetails() {
    this.productService.productDetails(this.productID).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in fetching Product Details.');
          } else {
              this.productDetails = response.productDetails[0];
              this.productImages = JSON.parse(this.productDetails.image);
              this.productFound = true;
          }
      },
      (error) => {
          console.log('Error in fetching Product Details.');
      }
  );


  }

  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }

  parseContent(text) {
    let specs = text.substring(0, text.length - 1);
    specs = specs.replace('=>', ':');
    // console.log(JSON.parse(specs));
    return text;
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }


}
