import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { HomeComponent } from '../home.component';
import { ProductService } from 'src/app/services/product/product.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  filterChange = new Subject();
  filtersForm: FormGroup;
  filters;
  searchResults = [];
  brandNames;
  categories;
  constructor(private home: HomeComponent, private productService: ProductService) {
    this.createFilterForm();
  }

  ngOnInit() {
    // this.getFilterData();
  }

  createFilterForm() {
    this.filtersForm = new FormGroup({
        searchText: new FormControl(''),
        brands: new FormArray([]),
        categories: new FormArray([])
    });
    this.filtersForm.valueChanges.pipe(debounceTime(500),
        distinctUntilChanged()
    ).subscribe(value => {
        if (value !== '' || undefined) {
            this.home.getProducts(value);
        }
    });
  }

  filterChanged() {
    this.home.getProducts(this.filtersForm.value);
  }

  getFilterData() {
    this.productService.getFilterData().subscribe(
        (response) => {
            if (response.error) {
                console.log('Error in fetching Filter Data.');
            } else {
                this.brandNames = response.brands;
                this.categories = response.categories;
            }
        },
        (error) => {
            console.log('Error in fetching Filter Data.');
        }
    );
  }

  brandChanged(brand: string, isChecked: boolean) {
    const brandFormArray = this.filtersForm.controls.brands as FormArray;
    if (isChecked) {
      brandFormArray.push(new FormControl(brand));
    } else {
      const index = brandFormArray.controls.findIndex(x => x.value === brand);
      brandFormArray.removeAt(index);
    }
  }

  categoryChanged(category: string, isChecked: boolean) {
    const categoryFormArray = this.filtersForm.controls.categories as FormArray;
    if (isChecked) {
      categoryFormArray.push(new FormControl(category));
    } else {
      const index = categoryFormArray.controls.findIndex(x => x.value === category);
      categoryFormArray.removeAt(index);
    }
  }

}
