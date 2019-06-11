import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class MessageDataStore {

  public static readonly PATH = '/messages';
  messageList: Message[] = [];

  constructor(
    private api: ApiService
  ) {}

  add(params: {[key: string]: any}): Promise<boolean> {
    return this.api.afs.collection(MessageDataStore.PATH).add(params)
    .then(docRef => {
        const id = docRef.id;
        return docRef.update({'id': id}).then(res2 => {
            return true
        }).catch(error => {
            return false
        })
    })
    .catch(error => {
        console.log(error)
        return false
    })
  }

  whereByUserId(uid: string): Observable<Message[]> {
      return this.api.afs.collection<Message>(MessageDataStore.PATH, ref => ref.where('user_id', '==', uid)).valueChanges()
  }

  updateByIsWatch(id: string): Promise<boolean> {
    return this.api.afs.doc(MessageDataStore.PATH+`/${id}`).update({'is_watch': true}).then(() => {
        return true
    }).catch(err => {
        return false
    })
  }
}