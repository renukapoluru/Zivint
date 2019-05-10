import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTextChanged = new Subject();
  searchResults = [];
  showingSearchResults = false;
  searchForm: FormGroup;
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.searchForm = new FormGroup({
        searchText: new FormControl(''),
    });
    this.searchForm.valueChanges.pipe(debounceTime(500),
        distinctUntilChanged()
    ).subscribe(value => {
        if (value.searchText !== '') {
            this.getSearchResults(value);
        } else {
          this.searchResults = [];
          this.showingSearchResults = false;
        }
    });
  }

  getSearchResults(searchterm) {
    this.productService.searchProduct(searchterm.searchText).subscribe(
        (response) => {
            if (response.error) {
                console.log('Error in fetching Searched Data.');
            } else {
                this.searchResults = response.searchResults;
                this.showingSearchResults = true;
            }
        },
        (error) => {
            console.log('Error in fetching Searched Data.');
        }
    );
  }

  gotoProduct() {
    this.showingSearchResults = false;
    this.searchResults = [];
    this.searchForm.controls.searchText.setValue('');
  }

}
