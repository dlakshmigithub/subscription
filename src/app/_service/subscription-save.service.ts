import { Injectable } from '@angular/core';

import { ISubscription } from '../_model/subscriptionType.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionSaveService {
public subscriptionValue: ISubscription[] = [];
constructor() { }

/** method to save the subscription form entries
 * @param email string
 * @param subscriptionType string
 * @param password string
 */

saveSubscriptionValue(subscriptionValue: ISubscription) {
  this.subscriptionValue.push(subscriptionValue);
}

/** @description method to get the subscription form entries
 *  @set  email string, subscriptionType string, password string
 */

getSubscriptionValue() {
     return this.subscriptionValue;
  }
}
