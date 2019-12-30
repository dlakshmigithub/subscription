import { ISubscriptionType } from './subscriptionType.interface';

export class SubscriptionType {
  subscriptionTypes: ISubscriptionType[] = [
    { value: 'Basic', name: 'Basic' },
    { value: 'Advanced', name: 'Advanced' },
    { value: 'Pro', name: 'Pro' }
    ];
  }
