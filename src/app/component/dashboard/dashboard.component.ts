import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { OrderDataStore } from 'src/app/store/order.store';
import * as moment from 'moment/moment';
import { MessageDataStore } from 'src/app/store/message.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  noPaidOrderList: Order[];
  makingOrderList: Order[];
  waitDeliveryOrderList: Order[];
  historyOrder: Order[];

  constructor(
    private router: Router,
    private auth: AuthService,
    private orderDataStore: OrderDataStore,
    private messageDataStore: MessageDataStore
  ) { }

  ngOnInit() {
    this.fetch()
  }

  fetch() {

    const todayStr = moment().format('YYYYMMDD')
    this.orderDataStore.whereByToday(todayStr).subscribe(docs => {
      this.noPaidOrderList = docs.filter(v => { return !v.is_paid && !v.is_make && !v.is_complete && !v.is_cancel });
      this.makingOrderList = docs.filter(v => { return v.is_paid && !v.is_make && !v.is_complete && !v.is_cancel });
      this.waitDeliveryOrderList = docs.filter(v => { return v.is_paid && v.is_make && !v.is_complete && !v.is_cancel });
      this.historyOrder = docs.filter(v => { return v.is_paid && v.is_make && v.is_complete && !v.is_cancel });
    })
  }

  convertDateFormat(unixtime_ms: number): string {
    return moment.unix(unixtime_ms/1000).format('YYYY年MM月DD日 HH時mm分')
  }

  sendTenMinutesAgoMessage(uid: string) {

    const timestamp = moment().unix()*1000;
    const params = {
      'message_subject': '[モッチャムチケット] あと10分ほどで出来上がりそうです。',
      'message_text': 'あと10分で出来上がりそうですので、受け取りにお越しください。',
      'user_id': uid,
      'is_watch': false,
      'message_month': moment().format('YYYYMM'),
      'message_date': moment().format('YYYYMMDD'),
      'message_time': moment().format('YYYYMMDDHHmm'),
      'created_at': timestamp
    }
    this.messageDataStore.add(params).then(res => {
      if (res) {
        confirm('OK')
      } else {
        confirm('失敗')
      }
    });
  }

  sendReceiptReminderMessage(uid: string) {

    const timestamp = moment().unix()*1000;
    const params = {
      'message_subject': '[モッチャムチケット] 商品が届いています。',
      'message_text': '商品が届いておりますので、お早めに受け取りにお越しください。',
      'user_id': uid,
      'is_watch': false,
      'message_month': moment().format('YYYYMM'),
      'message_date': moment().format('YYYYMMDD'),
      'message_time': moment().format('YYYYMMDDHHmm'),
      'created_at': timestamp
    }
    this.messageDataStore.add(params).then(res => {
      if (res) {
        confirm('OK')
      } else {
        confirm('失敗')
      }
    });
  }

  updateMakingOrder(orderId: string) {
    const userId = this.auth.currentUserId()
    const timestamp = moment().unix()*1000;
    const params = {
        'is_make': true,
        'updated_at': timestamp,
        'buyerId': userId
    }
    this.orderDataStore.update(orderId,params).then(res => {
      if (res) {
        location.reload();
      }
    })
  }

}
