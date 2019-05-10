import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {
  @Output() sortChanged = new EventEmitter<number>();
  sortSelected = 'Price: Low to High';
  showingMenu = false;
  sortOptions = ['Price: Low to High', 'Price: High to Low' ];
  sortbyPrice = 1;
  constructor() { }

  ngOnInit() {
    this.sortChanged.emit(this.sortbyPrice);
  }

  sortMenu() {
    this.showingMenu = !this.showingMenu;
  }

  sortChange(option) {
    this.sortSelected = option;
    option === 'Price: Low to High' ? this.sortbyPrice = 1 : this.sortbyPrice = -1;
    this.showingMenu = false;
    this.sortChanged.emit(this.sortbyPrice);
  }

}
