import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css']
})
export class HeroSliderComponent implements OnInit {

  slides = [
    {
      title: 'Wide range of Collections',
      img: '/assets/slider-bg-1.jpg'
    },
    {
      title: 'Unlimited Offers',
      img: '/assets/slider-bg-2.jpg'
    },
    {
      title: 'One stop for all your Fashionista choices',
      img: '/assets/slider-bg-4.jpg'
    },
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  ngOnInit() {

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

}
