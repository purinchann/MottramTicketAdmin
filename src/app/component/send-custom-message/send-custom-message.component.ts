import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MessageDataStore } from 'src/app/store/message.store';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-send-custom-message',
  templateUrl: './send-custom-message.component.html',
  styleUrls: ['./send-custom-message.component.sass']
})
export class SendCustomMessageComponent implements OnInit {

  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private messageDataStore: MessageDataStore
  ) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      'user_id': ['', [Validators.required]],
      'subject': ['', [Validators.required]],
      'text': ['', [Validators.required]]
    });
  }

  sendMessage() {

    const uid = this.messageForm.get('user_id').value as string;
    const subject = this.messageForm.get('subject').value as string;
    const text = this.messageForm.get('text').value as string;

    const timestamp = moment().unix()*1000;
    const params = {
      'message_subject': subject,
      'message_text': text,
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
        this.messageForm.setValue({
          'user_id': '',
          'subject': '',
          'text': ''
        });
      } else {
        confirm('失敗')
      }
    });
  }
}
