import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { OrderDataStore } from 'src/app/store/order.store';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-search-purchased-order',
  templateUrl: './search-purchased-order.component.html',
  styleUrls: ['./search-purchased-order.component.sass']
})
export class SearchPurchasedOrderComponent implements OnInit {

  searchForm: FormGroup;
  orders: Order[];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private orderDataStore: OrderDataStore
  ) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      'buyer_id': ['', [Validators.required]]
    });
  }

  searchOrderList() {

    const buyerId = this.searchForm.get('buyer_id').value as string;
    this.orderDataStore.whereByBuyerId(buyerId).subscribe(docs => {
      this.orders = docs;
      this.searchForm.setValue({'buyer_id': ''})
    });
  }

}
