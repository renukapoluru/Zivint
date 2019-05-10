import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  states: Array<String> = ['AR', 'AL', 'CA', 'DC'];

  addressForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, Validators.required],
      address: this.fb.array([this.addAddressGroup()])
    });
  }

  addAddressGroup() {
    return this.fb.group({
      primaryFlg: [],
      streetAddress: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipcode: [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  addAddress() {
    this.addressArray.push(this.addAddressGroup());
  }
  removeAddress(index) {
    this.addressArray.removeAt(index);
  }
  get addressArray() {
    return this.addressForm.get('address') as FormArray;
  }

  get firstName() {
    return this.addressForm.get('firstName');
  }

  get lastName() {
    return this.addressForm.get('lastName');
  }

  submitHandler() {
    if (this.addressForm.valid) {
      console.log({...this.addressForm.value});
    }

  }

}
