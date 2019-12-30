import { Injectable } from '@angular/core';
import { ISubscription } from '../_model/subscriptionType.interface';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionSaveService {
public subscriptionValue: ISubscription[] = [];
constructor() { }


saveSubscriptionValue(subscriptionValue: ISubscription) {

  this.subscriptionValue.push(subscriptionValue);
}

getSubscriptionValue() {
     return this.subscriptionValue;
  }
}
