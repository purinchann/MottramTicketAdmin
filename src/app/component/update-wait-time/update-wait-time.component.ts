import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ShopDataStore } from 'src/app/store/shop.store';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-update-wait-time',
  templateUrl: './update-wait-time.component.html',
  styleUrls: ['./update-wait-time.component.sass']
})
export class UpdateWaitTimeComponent implements OnInit {

  timeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private shopDataStore: ShopDataStore
  ) { }

  ngOnInit() {
    this.timeForm = this.fb.group({
      'time': ['', [Validators.required]]
    });
  }

  updateWaitTime() {
    
    const waitTimeStr = this.timeForm.get('time').value as string;
    const waitTime = Number(waitTimeStr);
    this.shopDataStore.update('Bhgou5g11hYztxeX2JFz', {'current_wait_time': waitTime})
  }
}
